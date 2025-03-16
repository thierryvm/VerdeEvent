'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
};

export default function BlogPage() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
    } else if (user) {
      fetchPosts();
    }
  }, [user, authLoading]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      // Vérifier d'abord si la connexion à Supabase est établie
      if (!supabase) {
        throw new Error(
          "La connexion à Supabase n'est pas établie. Vérifiez vos variables d'environnement."
        );
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur Supabase détaillée:', error);
        throw error;
      }

      setPosts(data || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des articles:', err);
      const errorMessage =
        err.message ||
        "Erreur inconnue. Vérifiez vos variables d'environnement Supabase et vos politiques RLS.";
      setError(`Erreur lors de la récupération des articles: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      setError('');
      setSuccess('');

      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const updatedData: any = {
        status: newStatus,
      };

      // Mettre à jour la date de publication si on passe en publié
      if (newStatus === 'published' && !post.published_at) {
        updatedData.published_at = new Date();
      }

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updatedData)
        .eq('id', post.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess(`Le statut de l'article "${post.title}" a été mis à jour avec succès.`);
      fetchPosts();
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError(`Erreur: ${err.message}`);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'article "${post.title}" ?`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      // Supprimer d'abord les relations avec les catégories
      const { error: deleteRelationsError } = await supabase
        .from('blog_posts_categories')
        .delete()
        .eq('post_id', post.id);

      if (deleteRelationsError) {
        throw deleteRelationsError;
      }

      // Supprimer l'article
      const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', post.id);

      if (deleteError) {
        throw deleteError;
      }

      setSuccess(`L'article "${post.title}" a été supprimé avec succès.`);
      fetchPosts();
    } catch (err: any) {
      console.error("Erreur lors de la suppression de l'article:", err);
      setError(`Erreur: ${err.message}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des articles</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/admin/blog/categories"
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 text-center"
          >
            Gérer les catégories
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-center"
          >
            Nouvel article
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucun article disponible. Créez votre premier article!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date de création
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Publication
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">/blog/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-emerald-600 hover:text-emerald-900 mr-3"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {post.status === 'published' ? 'Dépublier' : 'Publier'}
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
