import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

const teachers = [
  {
    name: "Faculty Member",
    subject: "Mathematics",
  },
  {
    name: "Faculty Member",
    subject: "Science",
  },
  {
    name: "Faculty Member",
    subject: "Programming",
  },
];

export function TeachersSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Our Teachers"
          title="Learn with dedicated educators"
          description="Teachers can create learning content, conduct tests and support student progress."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, index) => (
            <div
              key={`${teacher.subject}-${index}`}
              className="overflow-hidden rounded-2xl border"
            >
              <div className="flex `aspect-4/3` items-center justify-center bg-muted">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-10 w-10" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {teacher.subject}
                </p>

                <h3 className="mt-2 text-xl font-bold">{teacher.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Faculty at LKS
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link href="/teachers">
                Meet Our Teachers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            }
          ></Button>
        </div>
      </Container>
    </section>
  );
}
