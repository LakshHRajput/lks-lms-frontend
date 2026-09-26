import { Container } from "@/components/common/container";

const stats = [
  {
    value: "6–12",
    label: "Academic Classes",
  },
  {
    value: "10+",
    label: "Learning Programs",
  },
  {
    value: "100+",
    label: "Learning Topics",
  },
  {
    value: "24/7",
    label: "Online Access",
  },
];

export function Stats() {
  return (
    <section className="border-b">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-8 text-center sm:py-10"
            >
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}