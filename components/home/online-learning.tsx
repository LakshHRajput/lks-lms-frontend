import Link from "next/link";
import {
  CheckCircle2,
  PlayCircle,
  FileText,
  ClipboardCheck,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const benefits = [
  "Video-based learning",
  "Chapter-wise notes",
  "Online tests and assessments",
  "Learning progress tracking",
];

export function OnlineLearning() {
  return (
    <section className="bg-primary py-20 text-primary-foreground lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
              Online Learning
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn at your own pace with LKS
            </h2>

            <p className="mt-5 max-w-xl leading-7 opacity-80">
              Access structured courses, video lessons, notes, tests and
              progress information through your student dashboard.
            </p>

            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              className="mt-8 bg-background text-foreground hover:bg-background/90"
              nativeButton={false}
              render={<Link href="/courses">Explore Learning</Link>}
            ></Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: PlayCircle,
                title: "Video Classes",
              },
              {
                icon: FileText,
                title: "Digital Notes",
              },
              {
                icon: ClipboardCheck,
                title: "Online Tests",
              },
              {
                icon: CheckCircle2,
                title: "Track Progress",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur"
                >
                  <Icon className="h-7 w-7" />

                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
