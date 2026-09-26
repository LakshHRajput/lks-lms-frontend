import { Metadata } from "next";
import { BookOpen, Target, Users } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

export const metadata: Metadata = {
  title: "About LKS",
  description:
    "Learn about LKS - Learning Knowledge Solution in Jaipur, Rajasthan.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b bg-muted/40 py-20">
        <Container>
          <SectionHeading
            badge="About LKS"
            title="Learning Knowledge Solution"
            description="An education and skill-development platform designed to support structured learning and student progress."
          />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Learning",
                text: "Structured academic and skill-based learning.",
              },
              {
                icon: Target,
                title: "Growth",
                text: "Regular practice, assessment and progress tracking.",
              },
              {
                icon: Users,
                title: "Students",
                text: "A platform designed around student learning needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border p-6"
                >
                  <Icon className="h-7 w-7 text-primary" />

                  <h2 className="mt-5 text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}