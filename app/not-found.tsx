import GoBackButton from "@/components/common/go-back-button";
import Link from "next/link";
import { BookOpen, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <section className="relative w-full max-w-2xl text-center">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-lg font-bold tracking-wide text-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
            <BookOpen size={24} />
          </span>
          <span>
            LKS <span className="text-blue-400">Learning</span>
            <span className="block text-left text-xs font-medium tracking-widest text-slate-400">
              KNOWLEDGE SOLUTION
            </span>
          </span>
        </Link>

        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-400/20 bg-blue-400/10">
            <SearchX size={48} className="text-blue-400" />
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Error 404
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          Oops! The page you are looking for may have been moved, removed, or
          does not exist. Let&apos;s get you back to learning.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-600"
          >
            <Home size={19} />
            Go to Home
          </Link>

          <GoBackButton />
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Learn. Grow. Achieve. — LKS
        </p>
      </section>
    </main>
  );
}
