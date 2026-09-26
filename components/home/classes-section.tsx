import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
  FlaskConical,
  Laptop,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const classes = [
  {
    title: "Class 6–8",
    description:
      "Complete foundation learning across core academic subjects.",
    subjects: "Maths • Science • English • Hindi • SST • Computer",
    icon: Calculator,
    href: "/classes",
  },
  {
    title: "Class 9–10",
    description:
      "Focused preparation for Mathematics and Science.",
    subjects: "Mathematics • Science",
    icon: FlaskConical,
    href: "/classes",
  },
  {
    title: "Class 11–12 PCM",
    description:
      "Structured preparation for senior secondary PCM.",
    subjects: "Physics • Chemistry • Mathematics",
    icon: FlaskConical,
    href: "/classes",
  },
  {
    title: "Programming & Skills",
    description:
      "Build practical digital and programming skills.",
    subjects:
      "Programming • Web Development • JavaScript • Python",
    icon: Laptop,
    href: "/courses",
  },
];

export function ClassesSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Academic Programs"
          title="Learning paths for every stage"
          description="Choose a structured learning path based on your academic class or skill development goal."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {classes.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

                <p className="mt-5 text-sm font-medium">
                  {item.subjects}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}