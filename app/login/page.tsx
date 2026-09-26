"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login({
        email,
        password,
      });

      router.replace("/dashboard");
    } catch (error: unknown) {
      console.error("Login failed:", error);

      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">LKS Login</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Login to your LKS LMS account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@lks.com"
                autoComplete="email"
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Temporary Credentials */}
          <div className="mt-6 rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-semibold">Frontend Test Login</p>

            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                admin@lks.com
              </p>

              <p>
                <span className="font-medium text-foreground">Password:</span>{" "}
                admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
