import Link from "next/link";
import { CheckCircle2, Clock, FileQuestion, Trophy } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

export function TestSeries() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Test Series"
          title="Practice. Test. Improve."
          description="Regular assessments help students understand their progress and identify areas for improvement."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FileQuestion,
              title: "Topic Tests",
              text: "Practice individual topics.",
            },
            {
              icon: Clock,
              title: "Timed Tests",
              text: "Practice with real time limits.",
            },
            {
              icon: Trophy,
              title: "Performance",
              text: "View detailed results.",
            },
            {
              icon: CheckCircle2,
              title: "Progress",
              text: "Track improvement over time.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-2xl border p-6">
                <Icon className="h-7 w-7 text-primary" />

                <h3 className="mt-5 font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/results">View Results</Link>}
          ></Button>
        </div>
      </Container>
    </section>
  );
}
