import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubjectPerformance } from "@/types/progress-report";

interface ProgressSubjectCardProps {
  subject: SubjectPerformance;
}

export function ProgressSubjectCard({ subject }: ProgressSubjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base">{subject.subjectName}</CardTitle>

          <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
            Grade {subject.grade}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">
              {subject.percentage.toFixed(2)}%
            </p>

            <p className="text-xs text-muted-foreground">
              {subject.obtainedMarks} / {subject.totalMarks} marks
            </p>
          </div>

          <span className="text-sm font-medium capitalize">
            {subject.status}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${Math.min(Math.max(subject.percentage, 0), 100)}%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
