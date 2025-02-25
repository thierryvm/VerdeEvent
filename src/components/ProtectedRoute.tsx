import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("sb-auth-token");
    setIsVerified(!!token);
  }, []);

  if (!isAuthenticated || !isVerified) {
    return <Navigate to="/auth-vm2024" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
