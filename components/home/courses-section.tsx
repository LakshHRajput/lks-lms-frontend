import Link from "next/link";
import { ArrowRight, Code2, Globe, Megaphone, Terminal } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Programming",
    description: "Build programming fundamentals and problem-solving skills.",
    icon: Terminal,
    level: "Beginner",
    href: "/courses/programming",
  },
  {
    title: "Web Development",
    description: "Learn how modern websites and web applications are built.",
    icon: Globe,
    level: "Beginner to Intermediate",
    href: "/courses/web-development",
  },
  {
    title: "JavaScript",
    description:
      "Learn JavaScript fundamentals and modern development concepts.",
    icon: Code2,
    level: "Beginner",
    href: "/courses/javascript",
  },
  {
    title: "Digital Marketing",
    description:
      "Understand digital marketing, content, SEO and online growth.",
    icon: Megaphone,
    level: "Beginner",
    href: "/courses/digital-marketing",
  },
];

export function CoursesSection() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Skill Development"
          title="Build skills beyond textbooks"
          description="Practical learning programs designed to help students develop useful digital skills."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <div
                key={course.title}
                className="flex flex-col rounded-2xl border bg-background p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon />
                </div>

                <Badge className="mt-5 w-fit" variant="secondary">
                  {course.level}
                </Badge>

                <h3 className="mt-4 text-xl font-bold">{course.title}</h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {course.description}
                </p>

                <Button
                  variant="link"
                  nativeButton={false}
                  className="mt-5 justify-start px-0"
                  render={
                    <Link href={course.href}>
                      Explore course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  }
                ></Button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
