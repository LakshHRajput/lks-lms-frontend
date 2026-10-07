"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, PlayCircle } from "lucide-react";
import gsap from "gsap";

import { Container } from "@/components/common/container";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".hero-reveal", { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
        })
        .fromTo(".hero-photo", { scale: 1.08 }, { scale: 1, duration: 1.5 }, 0);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate min-h-[min(76svh,760px)] overflow-hidden text-white">
      <div
        className="hero-photo absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[#10251e]/65" aria-hidden="true" />

      <Container className="flex min-h-[min(76svh,760px)] items-center py-16 sm:py-20">
        <div className="max-w-3xl pb-8 pt-2 sm:pb-12">
          <p className="hero-reveal mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase text-white/80">
            <span className="size-2 rounded-full bg-[#f28662]" /> Jaipur · Academics · Practical skills
          </p>
          <h1 className="hero-reveal max-w-3xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            LKS Learning
            <span className="mt-2 block text-white/75">for what comes next.</span>
          </h1>
          <p className="hero-reveal mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Strong academic foundations, focused test preparation and practical digital skills for every next step.
          </p>
          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/classes" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#e86f4c] px-5 text-sm font-semibold text-white transition hover:bg-[#d95e3d]">
              Explore learning <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/admissions" className="inline-flex h-12 items-center justify-center rounded-md border border-white/50 px-5 text-sm font-semibold text-white transition hover:bg-white/10">
              Apply for admission
            </Link>
          </div>
          <div className="hero-reveal mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/25 pt-6 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><BookOpen size={17} /> Structured learning</span>
            <span className="inline-flex items-center gap-2"><PlayCircle size={17} /> Video classes</span>
            <span className="inline-flex items-center gap-2"><GraduationCap size={18} /> Progress tracking</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
