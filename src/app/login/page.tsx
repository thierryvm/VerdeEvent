'use client';

import { supabase, testSupabaseConnection } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);
  const router = useRouter();

  // Tester la connexion à Supabase au chargement de la page
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testSupabaseConnection();
        setConnectionStatus(result);
        if (!result.success) {
          console.error('Échec du test de connexion à Supabase:', result.error);
        } else {
          console.log('Connexion à Supabase réussie');
        }
      } catch (err) {
        console.error('Erreur lors du test de connexion:', err);
        setConnectionStatus({
          success: false,
          error: err instanceof Error ? err.message : 'Erreur inconnue',
        });
      }
    };

    checkConnection();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      console.log('Tentative de connexion avec:', email);

      // Vérifier d'abord si Supabase est accessible
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest.success) {
        throw new Error(`Impossible de se connecter à Supabase: ${connectionTest.error}`);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erreur d'authentification:", error);

        // Messages d'erreur personnalisés selon le type d'erreur
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Identifiants incorrects. Vérifiez votre email et mot de passe.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Veuillez confirmer votre adresse email avant de vous connecter.');
        } else {
          throw error;
        }
      }

      if (data?.user) {
        console.log('Connexion réussie, redirection vers /admin');

        // Utiliser directement window.location pour une redirection plus fiable
        console.log('Redirection avec window.location.href vers /admin');
        window.location.href = '/admin';
      } else {
        throw new Error('Aucune donnée utilisateur retournée malgré une connexion réussie');
      }
    } catch (err: any) {
      console.error('Exception lors de la connexion:', err);
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  // Déterminer si les champs doivent être désactivés (éviter les erreurs de type null)
  const isDisabled = loading || Boolean(connectionStatus && !connectionStatus.success);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600">VerdeEvent</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre espace administrateur</p>
        </div>

        {connectionStatus && !connectionStatus.success && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-sm">
            <p className="font-bold">Problème de connexion au serveur</p>
            <p>{connectionStatus.error || 'Impossible de contacter le serveur Supabase'}</p>
            <p className="mt-2">
              Veuillez vérifier votre connexion internet ou réessayer plus tard.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} suppressHydrationWarning={true}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              suppressHydrationWarning={true}
              disabled={isDisabled}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              suppressHydrationWarning={true}
              disabled={isDisabled}
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full bg-emerald-600 text-white p-3 rounded-md hover:bg-emerald-700 ${
              isDisabled ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            suppressHydrationWarning={true}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          {/* Bouton pour retester la connexion */}
          {connectionStatus && !connectionStatus.success && (
            <button
              type="button"
              onClick={async () => {
                setConnectionStatus(null);
                const result = await testSupabaseConnection();
                setConnectionStatus(result);
              }}
              className="w-full mt-3 bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300"
            >
              Retester la connexion
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
