import { Metadata } from "next";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Explore Class 6 to Class 12 learning programs at LKS.",
};

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

export default function ClassesPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Classes"
          title="Academic programs"
          description="Choose your academic class and explore available learning programs."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((className) => (
            <div
              key={className}
              className="rounded-2xl border p-8 text-center transition hover:border-primary/40 hover:shadow-md"
            >
              <p className="text-2xl font-bold">
                {className}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                View available subjects
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}