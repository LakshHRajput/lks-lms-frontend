import { Star } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";

const testimonials = [
  {
    name: "Student",
    className: "Class 10",
    text: "The structured lessons and regular tests make it easier to keep track of my preparation.",
  },
  {
    name: "Student",
    className: "Class 12 PCM",
    text: "Having learning material and progress information in one place makes studying more organized.",
  },
  {
    name: "Parent",
    className: "Parent",
    text: "The platform gives a clear view of learning activities and academic progress.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Student Experience"
          title="What learners say"
          description="Feedback from students and parents about their learning experience."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name + testimonial.className}
              className="rounded-2xl border bg-background p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current text-primary"
                  />
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                “{testimonial.text}”
              </p>

              <div className="mt-6 border-t pt-5">
                <p className="font-semibold">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {testimonial.className}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}