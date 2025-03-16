import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const initializeBlog = async () => {
      try {
        // Check Supabase connection first
        const { error: connectionError } = await supabase
          .from("posts")
          .select("count");
        if (connectionError && isMounted) {
          setIsSupabaseConnected(false);
          throw connectionError;
        }
        if (isMounted) {
          setIsSupabaseConnected(true);
        }

        // If connected, fetch posts immediately
        let query = supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (selectedCategory && selectedCategory !== "Tous les articles") {
          query = query.eq("category", selectedCategory);
        }

        const { data, error: postsError } = await query;

        if (postsError && isMounted) {
          throw postsError;
        }

        if (isMounted) {
          setPosts(data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Error initializing blog:", err);
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger les articles. Veuillez réessayer plus tard."
          );
          setIsSupabaseConnected(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeBlog();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const categories = [
    "Tous les articles",
    "Wedding Planning",
    "Aménagement Paysager",
  ];

  if (!isSupabaseConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-700 mb-4">
            Configuration Supabase requise
          </h2>
          <p className="text-amber-700 mb-4">
            Pour accéder au blog, vous devez d'abord configurer la connexion à
            Supabase :
          </p>
          <ol className="text-left text-amber-700 max-w-md mx-auto space-y-2 mb-6">
            <li>
              1. Cliquez sur le bouton "Connect to Supabase" en haut à droite
            </li>
            <li>
              2. Suivez les instructions pour créer ou connecter votre projet
              Supabase
            </li>
            <li>3. Une fois connecté, le blog s'affichera automatiquement</li>
          </ol>
          <p className="text-amber-600 text-sm">
            Cette étape est nécessaire uniquement lors de la première
            configuration.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-red-600">
            Si le problème persiste, veuillez vérifier votre connexion à
            Supabase.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-bold mb-2 text-gray-900">Blog</h1>
      <p className="text-xl text-gray-600 mb-12">
        Découvrez nos derniers articles et actualités
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category === "Tous les articles" ? null : category
              )
            }
            className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
              (category === "Tous les articles" && !selectedCategory) ||
              category === selectedCategory
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 transform hover:scale-105"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-emerald-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
          >
            {post.cover_image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.created_at}>
                    {format(new Date(post.created_at), "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </time>
                </div>
                {post.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {post.category}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <span className="inline-flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 text-lg">
            Aucun article disponible dans cette catégorie.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
