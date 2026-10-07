"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowRight, BookOpen, Eye, EyeOff, GraduationCap } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      if (axios.isAxiosError<{ message?: string }>(error)) {
        setError(error.response?.data?.message ?? "We could not sign you in. Check your details and try again.");
      } else {
        setError("We could not sign you in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[minmax(320px,0.9fr)_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#123d31] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-15" aria-hidden="true" style={{ backgroundImage: "radial-gradient(#ffffff 0.65px, transparent 0.65px)", backgroundSize: "18px 18px" }} />
        <Link href="/" className="relative flex items-center gap-3 text-sm font-semibold">
          <span className="flex size-10 items-center justify-center rounded-md bg-white text-[#123d31]">LKS</span>
          Learning Knowledge Solution
        </Link>
        <div className="relative max-w-md pb-8">
          <p className="mb-4 text-xs font-semibold uppercase text-white/70">Your learning, in one place</p>
          <h2 className="text-4xl font-semibold leading-tight">Make the next step count.</h2>
          <p className="mt-4 text-sm leading-6 text-white/75">Get back to your classes, assessments and learning progress.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/80">
            <span className="inline-flex items-center gap-2"><BookOpen size={16} /> Lessons</span>
            <span className="inline-flex items-center gap-2"><GraduationCap size={17} /> Progress</span>
          </div>
        </div>
        <p className="relative text-xs text-white/55">LKS · Jaipur, Rajasthan</p>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-xs text-primary-foreground">LKS</span>
            Learning Knowledge Solution
          </Link>
          <p className="text-xs font-semibold uppercase text-primary">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold">Sign in to LKS</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use the email and password linked to your account.</p>

          {error && <div role="alert" className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required aria-invalid={Boolean(error)} className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="h-11 w-full rounded-md border border-input bg-card px-3 pr-12 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-55">
              {isLoading ? "Signing in…" : "Sign in"}
              {!isLoading && <ArrowRight size={16} aria-hidden="true" />}
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-muted-foreground">
            New to LKS? <Link href="/register" className="font-semibold text-primary hover:underline">Create a student account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
