import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [settings, setSettings] = useState({
    siteName: "Océane Event Planner",
    contactEmail: "",
    phoneNumber: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
    seoSettings: {
      defaultTitle: "",
      defaultDescription: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("settings").upsert({
        id: 1, // Using a single row for all settings
        ...settings,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setMessage({
        type: "success",
        text: "Paramètres mis à jour avec succès",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erreur lors de la mise à jour des paramètres",
      });
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Paramètres du site</h1>
        <Link
          to="/dashboard-vm2024"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Retour au tableau de bord
        </Link>
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du site
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, phoneNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Réseaux sociaux</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: {
                        ...settings.socialMedia,
                        facebook: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: {
                        ...settings.socialMedia,
                        instagram: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: {
                        ...settings.socialMedia,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Paramètres SEO</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre par défaut
                </label>
                <input
                  type="text"
                  value={settings.seoSettings.defaultTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seoSettings: {
                        ...settings.seoSettings,
                        defaultTitle: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description par défaut
                </label>
                <textarea
                  value={settings.seoSettings.defaultDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seoSettings: {
                        ...settings.seoSettings,
                        defaultDescription: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
