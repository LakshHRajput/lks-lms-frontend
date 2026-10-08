"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
              Get in
              <span className="mx-2 text-muted-foreground">—</span>
              <br />
              touch with us
            </h2>

            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
              We&apos;re here to help. Whether you have a question about our courses,
              need help with your account, or want to share feedback, our team
              is ready to assist you.
            </p>

            {/* CONTACT DETAILS */}
            <div className="mt-9 space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>

                <a
                  href="mailto:info@lksinstitute.edu"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary md:text-base"
                >
                  info@lksinstitute.edu
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground md:text-base">
                  <a href="tel:+919549521541" className="hover:text-primary">
                    +91 9549521541
                  </a>
                  <span>,</span>
                  <a href="tel:+918502800869" className="hover:text-primary">
                    +91 8502800869
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-[28px] bg-[#eeeeee] p-6 md:p-8 lg:p-9">
            <form className="space-y-6">
              {/* NAME + PHONE */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-muted-foreground"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-14 w-full rounded-xl border border-transparent bg-white px-5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-muted-foreground"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-14 w-full rounded-xl border border-transparent bg-white px-5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-xl border border-transparent bg-white px-5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  How can we help you?
                </label>

                <textarea
                  id="message"
                  name="message"
                  maxLength={200}
                  placeholder="Your message..."
                  className="min-h-40 w-full resize-none rounded-xl border border-transparent bg-white px-5 py-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <div className="mt-2 text-right text-xs text-muted-foreground">
                  0/200
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="group flex items-center gap-3 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  Send message
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </div>

              {/* TERMS */}
              <p className="text-center text-xs leading-5 text-muted-foreground">
                By contacting us, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  Terms of service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
