import {
  BarChart3,
  BookOpenCheck,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const features = [
  {
    title: "Structured Learning",
    description:
      "Courses are organized into subjects, chapters, topics, videos and tests.",
    icon: BookOpenCheck,
  },
  {
    title: "Progress Tracking",
    description:
      "Students can monitor course progress, test performance and learning activity.",
    icon: BarChart3,
  },
  {
    title: "Expert Guidance",
    description:
      "Teachers can manage learning content, tests, attendance and student progress.",
    icon: GraduationCap,
  },
  {
    title: "Flexible Learning",
    description:
      "Access learning material and educational resources from different devices.",
    icon: Clock3,
  },
  {
    title: "Student Focused",
    description:
      "Designed around student learning, practice, assessment and improvement.",
    icon: Users,
  },
  {
    title: "Secure Platform",
    description:
      "Role-based access and secure API architecture protect platform data.",
    icon: ShieldCheck,
  },
];

export function WhyLks() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Why LKS"
          title="A complete learning experience"
          description="LKS combines academic learning, online resources, assessments and progress tracking in one platform."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}