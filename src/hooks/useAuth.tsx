'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier la session actuelle au chargement
    const checkSession = async () => {
      try {
        console.log('Vérification de la session utilisateur...');
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Erreur lors de la vérification de la session:', error);
          return;
        }

        if (data?.session) {
          console.log('Session utilisateur trouvée');
          setUser(data.session.user);
        } else {
          console.log('Aucune session utilisateur active');
          setUser(null);
        }
      } catch (e) {
        console.error('Exception lors de la vérification de la session:', e);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Configurer l'écouteur d'événements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Événement d'authentification:", event);

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      // Nettoyer l'écouteur à la destruction du composant
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
