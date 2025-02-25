import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { supabase } from "../lib/supabase";
import { AuthContext } from './auth-context-types';
import { User } from '@supabase/supabase-js';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setIsAuthenticated(true);
          setUser(currentUser);
          // Store session in memory instead of localStorage for better security
          await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token || ''
          });
          return true;
        }
      }
      setIsAuthenticated(false);
      setUser(null);
      await supabase.auth.signOut(); // Clear any existing session
      return false;
    } catch (error) {
      console.error('Erreur de vérification de session:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('sb-access-token');
      localStorage.removeItem('sb-refresh-token');
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      if (!mounted) return;

      try {
        setIsLoading(true);
        await checkSession();

        if (!mounted) return;

        // Set up auth state change listener regardless of current session
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            setIsAuthenticated(false);
            setUser(null);
            return;
          }

          if (session?.access_token) {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (mounted && currentUser) {
              setIsAuthenticated(true);
              setUser(currentUser);
              // Update session in Supabase client
              await supabase.auth.setSession({
                access_token: session.access_token,
                refresh_token: session.refresh_token || ''
              });
            }
          }
        });
        authSubscription = subscription;
      } catch (error) {
        console.error('Auth setup error:', error);
        if (mounted) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [checkSession]);
  // Update login function to use the token parameter
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data?.session) {
        throw new Error('Session invalide');
      }

      setIsAuthenticated(true);
      setUser(data.user);
      return data.session;
  } catch (error) {
    console.error('Erreur de login:', error);
    setIsAuthenticated(false);
    setUser(null);
    throw error;
  } finally {
    setIsLoading(false);
  }
}, []);
  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('sb-access-token');
      localStorage.removeItem('sb-refresh-token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};