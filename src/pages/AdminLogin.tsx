import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (!mounted) return;

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          navigate("/dashboard-vm2024", { replace: true });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    if (isAuthenticated) {
      navigate("/dashboard-vm2024", { replace: true });
    } else {
      checkAuth();
    }

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, navigate]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('SignIn error:', signInError);
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Email ou mot de passe incorrect');
        }
        throw signInError;
      }

      if (!authData?.session?.access_token) {
        throw new Error('Session invalide. Veuillez réessayer.');
      }

      if (authData.session.refresh_token) {
        try {
          localStorage.setItem('sb-refresh-token', authData.session.refresh_token);
          localStorage.setItem('sb-access-token', authData.session.access_token);
          // Set the session immediately to prevent race conditions
          await supabase.auth.setSession({
            access_token: authData.session.access_token,
            refresh_token: authData.session.refresh_token
          });
        } catch (storageError) {
          console.error('Error storing tokens:', storageError);
          throw new Error('Erreur lors de la sauvegarde de la session');
        }
      }

      await login(email, password);
      navigate('/dashboard-vm2024', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Une erreur inattendue est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isLoading, login, navigate]);

  const handleCreateAccount = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: "admin" },
          emailRedirectTo: `${window.location.origin}/auth-vm2024`,
        },
      });

      if (error) throw error;
      if (data.user) {
        setIsEmailSent(true);
        setError("Un email de confirmation a été envoyé.");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur de création de compte"
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isLoading]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Administration</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full p-2 border rounded pr-10"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>

        <button
          type="button"
          onClick={handleCreateAccount}
          disabled={isLoading}
          className="w-full mt-4 border border-emerald-600 text-emerald-600 py-2 rounded hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Créer un compte administrateur
        </button>

        {isEmailSent && (
          <button
            type="button"
            onClick={async () => {
              if (isLoading) return;
              setIsLoading(true);
              try {
                await supabase.auth.resend({
                  type: "signup",
                  email,
                });
                setError("Nouvel email envoyé !");
              } catch {
                setError("Erreur d'envoi");
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            className="w-full text-sm text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Renvoyer l'email
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
