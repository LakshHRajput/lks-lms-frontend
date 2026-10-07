"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { tokenManager } from "./token-manager";
import { authService } from "@/lib/api/services/auth.service";

import type { LoginInput, RegisterInput, User, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginInput) => Promise<void>;

  register: (data: RegisterInput) => Promise<void>;

  logout: () => Promise<void>;

  hasRole: (roles: UserRole | UserRole[]) => boolean;

  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let sessionRestore: Promise<User | null> | null = null;

const restoreSession = () => {
  if (!sessionRestore) {
    sessionRestore = (async () => {
      const refreshed = await authService.refresh();
      tokenManager.setToken(refreshed.data.accessToken);
      const currentUser = await authService.me();
      return currentUser.data;
    })().finally(() => {
      sessionRestore = null;
    });
  }

  return sessionRestore;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    let isMounted = true;

    restoreSession()
      .then((restoredUser) => {
        if (isMounted) setUser(restoredUser);
      })
      .catch(() => {
        tokenManager.clearToken();
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      tokenManager.clearToken();
      setUser(null);
      router.replace("/login");
    };

    window.addEventListener("lks:session-expired", handleSessionExpired);
    return () => window.removeEventListener("lks:session-expired", handleSessionExpired);
  }, [router]);

  const login = async (data: LoginInput): Promise<void> => {
    const response = await authService.login({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    tokenManager.setToken(response.data.accessToken);
    setUser(response.data.user);
  };

  const register = async (data: RegisterInput): Promise<void> => {
    await authService.register({ ...data, role: "STUDENT" });
    await login({ email: data.email, password: data.password });
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      tokenManager.clearToken();
      setUser(null);
      router.replace("/login");
    }
  };

  /**
   * Check role
   */
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) {
      return false;
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    return allowedRoles.includes(user.role);
  };

  /**
   * Check any role
   */
  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!user) {
      return false;
    }

    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
