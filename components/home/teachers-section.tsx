import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

const teachers = [
  {
    name: "Mr. Lakshman Singh Shekhawat",
    subject: "Mathematics & Programming",
    image: "/images/lakshman-sir.png",
  },
  {
    name: "Mr. Krishna Prakash Balodiya",
    subject: "Science & Programming",
    image: "/images/krishna-sir.png",
  },
  {
    name: "Miss. Kavya Sharma",
    subject: "Digital Marketing",
    image: "/images/kavya-mam.png",
  },
];

export function TeachersSection() {
  return (
    <section id="teachers" className="py-20 lg:py-28">
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
              className="overflow-hidden rounded-2xl border bg-background"
            >
              {/* Teacher Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Teacher Content */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {teacher.subject}
                </p>

                <h3 className="mt-2 text-xl font-bold leading-tight">
                  {teacher.name}
                </h3>

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
          />
        </div>
      </Container>
    </section>
  );
}
