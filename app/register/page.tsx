"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/use-auth";

export default function RegisterPage() {
  const router = useRouter();

  const { register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await register({
        name,
        email,
        phone,
        password,
      });

      router.replace("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[minmax(320px,0.9fr)_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#3098e2] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="relative flex items-center gap-3 text-sm font-semibold">
          <Image
            src="/images/logo.png"
            alt="Learning Knowledge Solution logo"
            width={50}
            height={50}
            className="h-14 w-14 object-contain"
          />
          Learning Knowledge Solution
        </Link>
        <div className="max-w-md pb-8">
          <p className="mb-4 text-xs font-semibold uppercase text-white/70">Start learning with LKS</p>
          <h2 className="text-4xl font-semibold leading-tight">Build strong foundations. Keep moving forward.</h2>
          <p className="mt-4 text-sm leading-6 text-white/75">Create your student account to access courses, tests and progress tracking.</p>
          <div className="mt-8 flex gap-5 text-xs text-white/80"><span className="inline-flex items-center gap-2"><BookOpen size={16} /> Courses</span><span className="inline-flex items-center gap-2"><GraduationCap size={17} /> Student tools</span></div>
        </div>
        <p className="text-xs text-white/55">LKS · Jaipur, Rajasthan</p>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary lg:hidden"><span className="flex size-9 items-center justify-center rounded-md bg-primary text-xs text-primary-foreground">LKS</span>Learning Knowledge Solution</Link>
        <p className="text-xs font-semibold uppercase text-primary">Student registration</p>
        <h1 className="mt-2 text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your details will be used to set up your student profile.</p>

        {error && (
          <div role="alert" className="mt-5 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block space-y-2 text-sm font-medium" htmlFor="name">Full name<input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm font-normal"
          /></label>

          <label className="block space-y-2 text-sm font-medium" htmlFor="email">Email address<input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm font-normal"
          /></label>

          <label className="block space-y-2 text-sm font-medium" htmlFor="phone">Phone <span className="font-normal text-muted-foreground">(optional)</span><input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="Phone"
            className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm font-normal"
          /></label>

          <label className="block space-y-2 text-sm font-medium" htmlFor="password">Password<input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm font-normal"
          /></label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating account…" : "Create student account"}
            {!isLoading && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
      </div>
      </section>
    </main>
  );
}
