import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function AdmissionCta() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <GraduationCap />
              </div>

              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Ready to start learning?
              </h2>

              <p className="mt-4 leading-7 opacity-80">
                Explore our academic and skill-development programs or submit an
                admission application.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
              nativeButton={false}
              render={
                <Link href="/admission">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              }
            ></Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
