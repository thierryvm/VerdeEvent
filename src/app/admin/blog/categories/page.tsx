'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export default function CategoriesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // État pour le formulaire d'ajout/modification
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchCategories();
    }
  }, [user, authLoading, router]);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.from('blog_categories').select('*').order('name');

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(`Erreur lors de la récupération des catégories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    // Mettre à jour le slug seulement si l'utilisateur n'a pas modifié le slug manuellement
    if (!editingId || (editingId && slug === generateSlug(name))) {
      setSlug(generateSlug(newName));
    }
  };

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setFormError('');
    setEditingId(null);
    setIsEditing(false);
  };

  const handleEditCategory = (category: Category) => {
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description || '');
    setEditingId(category.id);
    setIsEditing(true);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      if (!name || !slug) {
        throw new Error('Le nom et le slug sont obligatoires');
      }

      // Vérifier si le slug est unique (sauf pour la catégorie en cours d'édition)
      const { data: existingCategory, error: checkError } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', slug)
        .not('id', 'eq', editingId || '');

      if (checkError) {
        throw checkError;
      }

      if (existingCategory && existingCategory.length > 0) {
        throw new Error('Une catégorie avec ce slug existe déjà');
      }

      if (editingId) {
        // Mise à jour d'une catégorie existante
        const { error: updateError } = await supabase
          .from('blog_categories')
          .update({
            name,
            slug,
            description: description || null,
          })
          .eq('id', editingId);

        if (updateError) {
          throw updateError;
        }

        setSuccess('Catégorie mise à jour avec succès');
      } else {
        // Création d'une nouvelle catégorie
        const { error: insertError } = await supabase.from('blog_categories').insert([
          {
            name,
            slug,
            description: description || null,
          },
        ]);

        if (insertError) {
          throw insertError;
        }

        setSuccess('Catégorie créée avec succès');
      }

      resetForm();
      fetchCategories();
    } catch (err: any) {
      console.error("Erreur lors de l'enregistrement de la catégorie:", err);
      setFormError(`Erreur: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        'Êtes-vous sûr de vouloir supprimer cette catégorie? Tous les articles associés perdront cette catégorie.'
      )
    ) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      // Vérifier si des articles utilisent cette catégorie
      const { data: usedCategories, error: checkError } = await supabase
        .from('blog_posts_categories')
        .select('post_id')
        .eq('category_id', id);

      if (checkError) {
        throw checkError;
      }

      // Supprimer les relations avec les articles
      if (usedCategories && usedCategories.length > 0) {
        const { error: deleteRelationsError } = await supabase
          .from('blog_posts_categories')
          .delete()
          .eq('category_id', id);

        if (deleteRelationsError) {
          throw deleteRelationsError;
        }
      }

      // Supprimer la catégorie
      const { error: deleteError } = await supabase.from('blog_categories').delete().eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setSuccess('Catégorie supprimée avec succès');
      fetchCategories();
    } catch (err: any) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      setError(`Erreur lors de la suppression: ${err.message}`);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gérer les catégories</h1>
        <button
          onClick={() => router.push('/admin/blog')}
          className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
        >
          Retour au blog
        </button>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire d'ajout/modification */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
            </h2>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Identifiant unique pour l'URL</p>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Catégories existantes</h2>
            </div>

            {categories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Aucune catégorie disponible. Créez votre première catégorie!
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
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Slug
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
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
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {category.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
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
      </div>
    </div>
  );
}
