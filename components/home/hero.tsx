import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, PlayCircle } from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-background to-background" />

      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <Container>
        <div className="grid min-h-170 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Badge variant="secondary" className="mb-6">
              Jaipur&rsquo;s Learning & Skill Development Platform
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Learn today.
              <span className="block text-primary">Build your future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              LKS - Learning Knowledge Solution helps students learn academic
              subjects, prepare for tests and build practical digital skills
              through structured learning.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <Link href="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                }
              ></Button>

              <Button
                size="lg"
                nativeButton={false}
                variant="outline"
                render={<Link href="/admissions">Apply for Admission</Link>}
              ></Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-5 border-t pt-8">
              <div>
                <BookOpen className="mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Structured Learning</p>
              </div>

              <div>
                <PlayCircle className="mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Video Classes</p>
              </div>

              <div>
                <GraduationCap className="mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Progress Tracking</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border bg-background/80 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-muted p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Student Dashboard
                    </p>
                    <h3 className="mt-1 text-xl font-bold">Welcome back!</h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <GraduationCap />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-sm text-muted-foreground">
                      Course Progress
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[72%] rounded-full bg-primary" />
                    </div>

                    <p className="mt-2 text-sm font-semibold">72% completed</p>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-sm text-muted-foreground">
                      Upcoming Tests
                    </p>

                    <p className="mt-3 text-2xl font-bold">04</p>

                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border bg-background p-4">
                  <p className="text-sm font-semibold">
                    Recent Learning Activity
                  </p>

                  <div className="mt-4 space-y-3">
                    {[
                      "Physics — Laws of Motion",
                      "Mathematics — Quadratic Equations",
                      "Programming — JavaScript Basics",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{item}</span>

                        <span className="text-xs text-primary">Completed</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
