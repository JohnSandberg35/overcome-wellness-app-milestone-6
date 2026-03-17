import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

type User = {
  id: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  signup: (payload: { email: string; password: string; accountType?: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

type SignupResponse = {
  token: string;
  user: User;
};

type LoginResponse = {
  token: string;
  user: User;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("auth_token");
    const storedUser = window.localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("auth_user");
      }
    }
    setInitialised(true);
  }, []);

  const persistAuth = (nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    window.localStorage.setItem("auth_token", nextToken);
    window.localStorage.setItem("auth_user", JSON.stringify(nextUser));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("auth_user");
  };

  const signupMutation = useMutation<SignupResponse, Error, { email: string; password: string; accountType?: string }>({
    mutationFn: async (payload) => {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create account");
      }

      return response.json();
    },
    onSuccess: (data) => {
      persistAuth(data.token, data.user);
    },
  });

  const loginMutation = useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: async (payload) => {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to log in");
      }

      return response.json();
    },
    onSuccess: (data) => {
      persistAuth(data.token, data.user);
    },
  });

  const signup = async (payload: { email: string; password: string; accountType?: string }) => {
    await signupMutation.mutateAsync(payload);
  };

  const login = async (payload: { email: string; password: string }) => {
    await loginMutation.mutateAsync(payload);
  };

  const logout = () => {
    clearAuth();
  };

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      token,
      signup,
      login,
      logout,
      isLoading: !initialised || signupMutation.isPending || loginMutation.isPending,
      error: signupMutation.error?.message || loginMutation.error?.message || null,
    }),
    [user, token, signupMutation.isPending, signupMutation.error, loginMutation.isPending, loginMutation.error, initialised]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

