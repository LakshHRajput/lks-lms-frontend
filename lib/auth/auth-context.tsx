"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { tokenManager } from "./token-manager";

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

/**
 * Temporary frontend-only user
 * Backend connect hone ke baad isko remove kar denge.
 */
const MOCK_USER: User = {
  id: 1,
  name: "LKS Admin",
  email: "admin@lks.com",
  role: "SUPER_ADMIN",
  isActive: true,
};

const MOCK_TOKEN = "lks-frontend-test-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  /**
   * Restore mock login from localStorage
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("lks-user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;

        tokenManager.setToken(MOCK_TOKEN);

        // React warning avoid karne ke liye
        // state update ko async callback me kiya gaya hai.
        queueMicrotask(() => {
          setUser(parsedUser);
          setIsLoading(false);
        });

        return;
      } catch (error) {
        console.error("Failed to restore mock user:", error);

        localStorage.removeItem("lks-user");
        tokenManager.clearToken();
      }
    }

    queueMicrotask(() => {
      setIsLoading(false);
    });
  }, []);

  /**
   * Frontend-only login
   *
   * Test credentials:
   * Email: admin@lks.com
   * Password: admin123
   */
  const login = async (data: LoginInput): Promise<void> => {
    const email = data.email.trim().toLowerCase();

    if (email !== "admin@lks.com" || data.password !== "admin123") {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("lks-user", JSON.stringify(MOCK_USER));

    tokenManager.setToken(MOCK_TOKEN);

    setUser(MOCK_USER);
  };

  /**
   * Temporary frontend-only registration
   */
  const register = async (data: RegisterInput): Promise<void> => {
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: "STUDENT",
      isActive: true,
    };

    localStorage.setItem("lks-user", JSON.stringify(newUser));

    tokenManager.setToken(MOCK_TOKEN);

    setUser(newUser);
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    localStorage.removeItem("lks-user");

    tokenManager.clearToken();

    setUser(null);

    router.push("/login");
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
