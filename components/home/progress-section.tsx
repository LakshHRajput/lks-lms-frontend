import { Container } from "@/components/common/container";

export function ProgressSection() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Student Progress
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Understand your learning progress
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Students can monitor course completion, test
              performance, attendance and other learning metrics
              from their dashboard.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>

                <p className="mt-1 text-3xl font-bold">
                  78%
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-primary/20">
                <span className="text-sm font-bold">
                  78
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[
                ["Mathematics", 85],
                ["Science", 72],
                ["Programming", 64],
              ].map(([name, value]) => (
                <div key={name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{name}</span>
                    <span className="font-medium">
                      {value}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}