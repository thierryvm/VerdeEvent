import { createContext } from "react";
import { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "user";

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<Session | null>;
  logout: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  checkRole: (requiredRole: UserRole) => boolean;
  userRole: UserRole | null;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: async () => null,
  logout: async () => {},
  user: null,
  isLoading: false,
  refreshSession: async () => {},
  checkRole: () => false,
  userRole: null,
});

AuthContext.displayName = "AuthContext";

export interface AuthProviderProps {
  children: React.ReactNode;
}
