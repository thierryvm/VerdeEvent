import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Edit2 } from 'lucide-react';

const AdminFloatingMenu = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Only render for authenticated users
  if (!isAuthenticated) return null;

  const getAdminPath = () => {
    const path = location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return `/dashboard-vm2024/blog/edit/${slug}`;
    }
    return '/dashboard-vm2024';
  };

  return (
    <div className="fixed bottom-8 right-20 z-40 flex flex-col gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col gap-1.5">
        <Link
          to={getAdminPath()}
          className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800/80 backdrop-blur-sm text-white/90 rounded-md hover:bg-gray-800 shadow-sm transition-all duration-300 group"
          title="Gérer le contenu"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Gérer</span>
        </Link>
        <Link
          to="/dashboard-vm2024"
          className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800/80 backdrop-blur-sm text-white/90 rounded-md hover:bg-gray-800 shadow-sm transition-all duration-300 group"
          title="Administration"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminFloatingMenu;