'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase, testSupabaseConnection } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Vérification directe de l'authentification
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);

        // Tester d'abord la connexion à Supabase
        const connectionTest = await testSupabaseConnection();
        setConnectionStatus(connectionTest);

        if (!connectionTest.success) {
          console.error('Erreur de connexion à Supabase:', connectionTest.error);
          setError('Erreur de connexion à Supabase: ' + connectionTest.error);
          setIsCheckingAuth(false);
          return;
        }

        // Vérifier la session côté client directement
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Erreur lors de la vérification de la session:', sessionError);
          setError('Erreur lors de la vérification de la session: ' + sessionError.message);
          setIsCheckingAuth(false);
          return;
        }

        if (!data.session) {
          console.log('Aucune session trouvée côté client');
          // Ne pas rediriger tout de suite, laisser useAuth le faire si nécessaire
        } else {
          console.log('Session trouvée côté client:', data.session.user.email);
          // useAuth devrait déjà avoir la session
        }
      } catch (err: any) {
        console.error("Exception lors de la vérification de l'authentification:", err);
        setError('Erreur inattendue: ' + (err.message || 'Erreur inconnue'));
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Afficher un écran de chargement pendant la vérification
  if (loading || isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600"></div>
      </div>
    );
  }

  // Afficher l'erreur si présente
  if (error || (connectionStatus && !connectionStatus.success)) {
    const errorMessage = error || connectionStatus?.error || 'Erreur de connexion inconnue';

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Erreur de configuration</p>
          <p>{errorMessage}</p>
          <p className="mt-2">
            Vérifiez que votre fichier .env.local contient les variables suivantes:
          </p>
          <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
            NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
            <br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
          </pre>
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Retourner à la page de connexion
          </button>

          <button
            onClick={async () => {
              setError(null);
              setConnectionStatus(null);
              const result = await testSupabaseConnection();
              setConnectionStatus(result);
              if (result.success) {
                // Réessayer de charger la page
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Retester la connexion
          </button>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!user) {
    // Redirection côté client
    console.log('Utilisateur non authentifié, redirection vers /login...');
    window.location.href = '/login';
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600 mx-auto mb-4"></div>
          <p>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  // Utilisateur authentifié, afficher le tableau de bord
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <button
          onClick={async () => {
            try {
              await supabase.auth.signOut();
              window.location.href = '/login';
            } catch (err) {
              console.error('Erreur lors de la déconnexion:', err);
            }
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte pour les articles de blog */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Blog</h2>
          <p className="text-gray-600 mb-4">
            Gérez vos articles de blog, catégories et publications.
          </p>
          <Link
            href="/admin/blog"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Gérer les articles
          </Link>
        </div>

        {/* Carte pour les services */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
          <p className="text-gray-600 mb-4">Gérez les services proposés par votre entreprise.</p>
          <Link
            href="/admin/services"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Gérer les services
          </Link>
        </div>

        {/* Carte pour les témoignages */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Témoignages</h2>
          <p className="text-gray-600 mb-4">
            Gérez les témoignages clients affichés sur votre site.
          </p>
          <Link
            href="/admin/testimonials"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Gérer les témoignages
          </Link>
        </div>

        {/* Carte pour les contacts */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
          <p className="text-gray-600 mb-4">
            Consultez les messages reçus via le formulaire de contact.
          </p>
          <Link
            href="/admin/contacts"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Voir les messages
          </Link>
        </div>
      </div>
    </div>
  );
}
