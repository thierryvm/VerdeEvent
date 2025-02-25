import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import type { Database } from "../../types/supabase";
import DOMPurify from "dompurify";

type Post = Database["public"]["Tables"]["posts"]["Row"];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError("URL invalide");
        setLoading(false);
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (supabaseError) {
          setError("Impossible de charger l'article");
          return;
        }

        if (!data) {
          setError("Article non trouvé");
          return;
        }
        setPost(data);
      } catch {
        setError("Erreur lors de la récupération de l'article");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">Chargement de l'article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux articles
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">{error || "Article non trouvé"}</p>
        </div>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux articles
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.created_at} className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(post.created_at), "dd MMMM yyyy", {
              locale: fr,
            })}
          </time>
          {post.category && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </div>
          )}
        </div>
      </header>

      {post.cover_image && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-img:max-w-[300px] prose-img:float-left prose-img:mr-6 prose-img:mb-4 prose-headings:clear-both prose-p:clear-none prose-p:mb-4"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  );
};

export default BlogPost;
