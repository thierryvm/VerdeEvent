import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  cover_image?: string;
  created_at: string;
  published: boolean;
}

const BlogPreview = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
        setError("Impossible de charger l'article");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Article non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/admin/blog" className="text-blue-600 hover:text-blue-800">
          ← Retour à la gestion
        </Link>
      </div>

      <div className="bg-yellow-100 p-4 mb-6 rounded">
        <p className="text-yellow-800">
          Mode prévisualisation {!post.published && "- Brouillon"}
        </p>
      </div>

      <article>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-4">
          Par {post.author} · {new Date(post.created_at).toLocaleDateString()}
        </div>
        {post.excerpt && (
          <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPreview;
