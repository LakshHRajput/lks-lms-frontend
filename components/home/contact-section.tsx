import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="border-t py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Get in Touch"
          title="Have questions?"
          description="Contact LKS for admissions, courses and learning-related information."
        />

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin />
            </div>

            <h3 className="mt-4 font-semibold">Location</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Jaipur, Rajasthan, India
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone />
            </div>

            <h3 className="mt-4 font-semibold">Phone</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              +91 XXXXX XXXXX
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail />
            </div>

            <h3 className="mt-4 font-semibold">Email</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              info@lks.example
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            nativeButton={false}
            render={<Link href="/contact">Contact LKS</Link>}
          ></Button>
        </div>
      </Container>
    </section>
  );
}
