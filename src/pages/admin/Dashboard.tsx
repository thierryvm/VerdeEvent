import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BarChart2, Users, FileText, Settings, LogOut } from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
import { supabase } from "../../lib/supabase";
const AdminDashboard = () => {
  const { isAuthenticated, logout, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({
    events: 0,
    posts: 0,
    media: 0,
    eventTypes: {
      wedding: 0,
      garden: 0,
      babyShower: 0,
      anniversary: 0,
      other: 0,
    },
  });
  const displayName = useMemo(() => {
    if (!user) {
      return "Admin";
    }
    return user.user_metadata?.name || user.email?.split("@")[0] || "Admin";
  }, [user]);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth-vm2024");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    let chartInstance: Chart | null = null;

    const initChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          // Ensure any existing chart is destroyed
          if (chartInstance) {
            chartInstance.destroy();
          }

          chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: [
                "Mariages",
                "Jardins",
                "Baby Showers",
                "Anniversaires",
                "Autres",
              ],
              datasets: [
                {
                  data: [30, 20, 15, 25, 10],
                  backgroundColor: [
                    "rgba(99, 102, 241, 0.8)",
                    "rgba(16, 185, 129, 0.8)",
                    "rgba(236, 72, 153, 0.8)",
                    "rgba(245, 158, 11, 0.8)",
                    "rgba(107, 114, 128, 0.8)",
                  ],
                  borderColor: [
                    "rgba(99, 102, 241, 1)",
                    "rgba(16, 185, 129, 1)",
                    "rgba(236, 72, 153, 1)",
                    "rgba(245, 158, 11, 1)",
                    "rgba(107, 114, 128, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw;
                      const total = context.dataset.data.reduce(
                        (a: number, b: number) => a + b,
                        0
                      );
                      const percentage = Math.round(
                        ((value as number) / total) * 100
                      );
                      return `${label}: ${percentage}%`;
                    },
                  },
                },
              },
            },
          });
        }
      }
    };

    initChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [stats]);
  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const [postsResult, mediaResult, eventsResult] = await Promise.all([
          supabase
            .from("posts")
            .select("id", { count: "exact", head: true })
            .eq("published", true),
          supabase.storage.from("blog-images").list(),
          supabase
            .from("events")
            .select("id", { count: "exact", head: true })
            .gte("date", new Date().toISOString())
            .lte(
              "date",
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            ),
        ]);

        if (mounted) {
          setStats({
            events: eventsResult.count || 0,
            posts: postsResult.count || 0,
            media: mediaResult.data?.length || 0,
            eventTypes: {
              wedding: 0,
              garden: 0,
              babyShower: 0,
              anniversary: 0,
              other: 0,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    fetchStats();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth-vm2024" replace />;
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors"
            >
              VerdeVent
            </Link>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
              {displayName}
            </span>
          </div>
        </div>
        <nav className="px-4 py-2">
          <Link
            to="/dashboard-vm2024"
            className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg mb-2"
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to="/dashboard-vm2024/blog"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2"
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Articles</span>
          </Link>
          <Link
            to="/dashboard-vm2024/media"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2"
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Médiathèque</span>
          </Link>
          <Link
            to="/dashboard-vm2024/settings"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Paramètres</span>
          </Link>
        </nav>
        <div className="px-6 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Tableau de bord
            </h1>
            <p className="text-gray-500">
              {new Date().toLocaleDateString("fr-FR")}
            </p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-sm animate-pulse"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 w-full">
                      <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-blue-100 mb-1">
                      Événements à venir
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.events}
                    </h3>
                    <p className="text-sm text-blue-100 mt-1">
                      Dans les 30 prochains jours
                    </p>
                  </div>
                  <BarChart2 className="w-6 h-6 text-white opacity-75" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-purple-100 mb-1">
                      Articles de blog
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.posts}
                    </h3>
                    <p className="text-sm text-purple-100 mt-1">
                      Articles publiés
                    </p>
                  </div>
                  <FileText className="w-6 h-6 text-white opacity-75" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-emerald-100 mb-1">
                      Fichiers média
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.media}
                    </h3>
                    <p className="text-sm text-emerald-100 mt-1">
                      Images et documents
                    </p>
                  </div>
                  <Users className="w-6 h-6 text-white opacity-75" />
                </div>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Répartition des événements
            </h3>
            <div className="flex justify-center items-center h-64">
              <canvas ref={chartRef} width="400" height="400"></canvas>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/dashboard-vm2024/blog/edit"
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Nouvel article</h3>
              <p className="text-gray-600">Créer et publier du contenu</p>
            </Link>
            <Link
              to="/dashboard-vm2024/media"
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Médiathèque</h3>
              <p className="text-gray-600">Gérer vos fichiers médias</p>
            </Link>
            <Link
              to="/dashboard-vm2024/settings"
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Paramètres</h3>
              <p className="text-gray-600">Configurer vos préférences</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
