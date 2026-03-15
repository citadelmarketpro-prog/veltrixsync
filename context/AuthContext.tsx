"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  bio: string;
  balance: string;
  invested_value: string;
  profit: string;
  roi: string;
  is_trader: boolean;
  trading_days: number;
  copiers_count: number;
  followers_count: number;
  min_capital: string;
  specialty: string;
  kyc_status: "not_submitted" | "submitted" | "under_review" | "approved" | "rejected";
  date_joined: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, password2: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const me = await api.get<AuthUser>("/api/auth/me/");
      setUser(me);
    } catch {
      setUser(null);
    }
  }, []);

  // Hydrate user from cookie on first render
  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  // Auto-logout when api.ts fires "auth:expired" (refresh token rejected by server)
  useEffect(() => {
    async function handleExpired() {
      // Best-effort: ask server to clear its HttpOnly cookies; ignore errors.
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/auth/logout/`,
          { method: "POST", credentials: "include" },
        );
      } catch { /* ignore */ }
      setUser(null);
      router.replace("/sign-in");
    }

    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, [router]);

  const login = useCallback(async (email: string, password: string) => {
    await api.post("/api/auth/login/", { email, password });
    const me = await api.get<AuthUser>("/api/auth/me/");
    setUser(me);
    router.push(me.kyc_status === "not_submitted" ? "/kyc" : "/dashboard");
  }, [router]);

  const register = useCallback(
    async (username: string, email: string, password: string, password2: string) => {
      await api.post("/api/auth/register/", { username, email, password, password2 });
      const me = await api.get<AuthUser>("/api/auth/me/");
      setUser(me);
      router.push(me.kyc_status === "not_submitted" ? "/kyc" : "/dashboard");
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout/");
    } catch (e) {
      // Ignore errors — clear client state regardless
      if (!(e instanceof ApiError)) throw e;
    }
    setUser(null);
    router.push("/sign-in");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
