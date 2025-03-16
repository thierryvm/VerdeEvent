'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../new/editor.css';

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

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar rounded-t-md">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Gras
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italique
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        Souligné
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>Paragraphe</button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        Gauche
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        Centre
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        Droite
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Liste à puces
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Liste numérotée
      </button>
      <button
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        Lien
      </button>
      <button
        onClick={() => {
          const url = window.prompt("URL de l'image");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        Image
      </button>
    </div>
  );
};

export default function EditBlogPost() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('draft');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      Link,
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && id) {
      fetchPost();
      fetchCategories();
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    if (post && editor) {
      editor.commands.setContent(post.content || '');
    }
  }, [post, editor]);

  const fetchPost = async () => {
    try {
      setLoading(true);

      // Récupérer l'article
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (postError) {
        throw postError;
      }

      if (!post) {
        throw new Error('Article non trouvé');
      }

      setPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt || '');
      setContent(post.content);
      setFeaturedImage(post.featured_image || '');
      setStatus(post.status);

      // Récupérer les catégories associées
      const { data: postCategories, error: categoriesError } = await supabase
        .from('blog_posts_categories')
        .select('category_id')
        .eq('post_id', id);

      if (categoriesError) {
        throw categoriesError;
      }

      if (postCategories && postCategories.length > 0) {
        setSelectedCategories(postCategories.map((pc) => pc.category_id));
      }
    } catch (err: any) {
      console.error("Erreur lors de la récupération de l'article:", err);
      setError(`Erreur: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);

      // Vérifier si des catégories existent
      const { data: existingCategories, error: checkError } = await supabase
        .from('blog_categories')
        .select('*');

      if (checkError) {
        throw checkError;
      }

      // Si aucune catégorie n'existe, créons-en une par défaut
      if (!existingCategories || existingCategories.length === 0) {
        const { error: createError } = await supabase.from('blog_categories').insert([
          {
            name: 'Non classé',
            slug: 'non-classe',
            description: 'Catégorie par défaut pour les articles non classés',
          },
        ]);

        if (createError) {
          throw createError;
        }
      }

      // Récupérer toutes les catégories
      const { data, error } = await supabase.from('blog_categories').select('*').order('name');

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(`Erreur lors de la récupération des catégories: ${err.message}`);
    } finally {
      setCategoriesLoading(false);
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Ne mettre à jour le slug que si l'utilisateur n'a pas déjà modifié le slug
    if (slug === post?.slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      if (!title || !slug || !content) {
        throw new Error('Le titre, le slug et le contenu sont obligatoires');
      }

      // Mettre à jour l'article
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          title,
          slug,
          excerpt,
          content,
          featured_image: featuredImage,
          status,
          published_at: status === 'published' ? post?.published_at || new Date() : null,
          updated_at: new Date(),
        })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      // Supprimer les anciennes relations de catégories
      const { error: deleteError } = await supabase
        .from('blog_posts_categories')
        .delete()
        .eq('post_id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Insérer les nouvelles relations de catégories
      if (selectedCategories.length > 0) {
        const categoryRelations = selectedCategories.map((categoryId) => ({
          post_id: id,
          category_id: categoryId,
        }));

        const { error: relationError } = await supabase
          .from('blog_posts_categories')
          .insert(categoryRelations);

        if (relationError) {
          throw relationError;
        }
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/blog');
      }, 2000);
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour de l'article:", err);
      setError(`Erreur: ${err.message}`);
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-bold text-gray-800">Modifier l'article</h1>
        <button
          onClick={() => router.push('/admin/blog')}
          className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
        >
          Retour
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Article mis à jour avec succès! Redirection...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
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
          <p className="text-sm text-gray-500 mt-1">L'identifiant unique de l'article dans l'URL</p>
        </div>

        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
            Extrait
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-1">
            Un court résumé de l'article (utilisé dans les listes et les aperçus)
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Contenu *
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="prose max-w-none min-h-[300px] p-4" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium mb-2">
            Image à la une (URL)
          </label>
          <input
            type="url"
            id="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Statut
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Catégories</label>
          {categoriesLoading ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleCategoryChange(e, category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category.id}`} className="text-gray-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune catégorie disponible.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Mise à jour en cours...' : "Mettre à jour l'article"}
          </button>
        </div>
      </form>
    </div>
  );
}
