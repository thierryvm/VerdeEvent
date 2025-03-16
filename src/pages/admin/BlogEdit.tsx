import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/quill.css";
import { Link } from "react-router-dom";

const AdminBlogEdit = () => {
  const quillRef = useRef<ReactQuill>(null);
  const AUTHORS = [
    { id: "oceane", name: "Océane" },
    { id: "thierry", name: "Thierry" },
    { id: "yoan", name: "Yoan" },
  ] as const;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<
    "wedding" | "garden" | "wedding planner" | "baby shower" | "anniversaries"
  >("wedding");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        setError("Impossible de télécharger l'image");
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch {
      setError("Erreur lors du traitement de l'image");
      return null;
    }
  }, []); // Empty dependency array since it doesn't use any external values
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
  ];
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!title.trim()) throw new Error("Le titre est requis");
      if (!content.trim()) throw new Error("Le contenu est requis");
      if (!author.trim()) throw new Error("L'auteur est requis");
      if (!coverImage) throw new Error("L'image de couverture est requise");

      const generatedSlug =
        slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .substring(0, 100);

      const post = {
        title: title.trim(),
        content: content.trim(),
        excerpt:
          excerpt.trim() ||
          content
            .replace(/<[^>]*>/g, "")
            .substring(0, 150)
            .trim(),
        slug: generatedSlug,
        category,
        cover_image: coverImage,
        published,
        author: author.trim(),
        created_at: id ? undefined : new Date().toISOString(),
      };

      try {
        const { error: dbError } = id
          ? await supabase.from("posts").update(post).eq("id", id)
          : await supabase.from("posts").insert([post]);

        if (dbError) throw new Error(dbError.message);

        navigate("/dashboard-vm2024/blog");
      } catch (dbError) {
        console.error("Database error:", dbError);
        setError(
          "Erreur de connexion à la base de données. Veuillez réessayer."
        );
        return;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de la sauvegarde"
      );
    } finally {
      setLoading(false);
    }
  };
  // Mise à jour de la configuration de l'éditeur
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["blockquote"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: async function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            return new Promise((resolve) => {
              input.onchange = async () => {
                const file = input.files?.[0];
                if (file) {
                  const url = await handleImageUpload(file);
                  if (url && quillRef.current) {
                    resolve(url);
                  }
                }
              };
            });
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [handleImageUpload]
  );
  // Separate image handler
  // Move handleQuillImageUpload inside useEffect to avoid dependency issues
  useEffect(() => {
    const handleQuillImageUpload = async () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const url = await handleImageUpload(file);
          if (url && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", url);
          }
        }
      };
    };

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleQuillImageUpload);
    }
  }, [handleImageUpload]);
  // Modification de la fonction loadPost pour gérer les brouillons
  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title || "");
          setContent(data.content || "");
          setExcerpt(data.excerpt || "");
          setSlug(data.slug || "");
          setCategory(data.category || "wedding");
          setCoverImage(data.cover_image || "");
          setPublished(!!data.published);
          setAuthor(data.author || "");
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'article:", err);
        setError("Impossible de charger l'article");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {id ? "Modifier l'article" : "Nouvel Article"}
        </h1>
        <div className="flex gap-4">
          <Link
            to="/dashboard-vm2024/blog"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ← Retour à la liste des articles
          </Link>
          <Link
            to={`/blog/${slug}`}
            target="_blank"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-md hover:bg-emerald-100"
          >
            Voir le résultat
          </Link>
        </div>
      </div>
      {loading && (
        <div className="mb-4 p-4 text-blue-700 bg-blue-100 rounded-md">
          Loading...
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            placeholder="Généré automatiquement"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "wedding"
                  | "garden"
                  | "wedding planner"
                  | "baby shower"
                  | "anniversaries"
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="wedding">Mariage</option>
            <option value="garden">Jardin</option>
            <option value="wedding planner">Wedding Planner</option>
            <option value="baby shower">Baby Shower</option>
            <option value="anniversaries">Anniversaires</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image de couverture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = await handleImageUpload(file);
                if (url) setCoverImage(url);
              }
            }}
            className="w-full p-2 border rounded"
          />
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover preview"
              className="h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Auteur
          </label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionner un auteur</option>
            {AUTHORS.map((auth) => (
              <option key={auth.id} value={auth.id}>
                {auth.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label className="text-sm font-medium text-gray-700">
            Publier l'article
          </label>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Extrait
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Bref résumé de l'article (optionnel)"
          />
        </div>
        {/* ... previous form fields ... */}
        <div className="min-h-[400px] relative mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu
          </label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="h-full"
            preserveWhitespace
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEdit;
