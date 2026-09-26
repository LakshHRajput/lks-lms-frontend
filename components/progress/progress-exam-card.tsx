import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExamPerformance } from "@/types/progress-report";

interface ProgressExamCardProps {
  exam: ExamPerformance;
}

export function ProgressExamCard({ exam }: ProgressExamCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">{exam.examTitle}</CardTitle>

            {exam.examDate && (
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(exam.examDate).toLocaleDateString()}
              </p>
            )}
          </div>

          <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
            {exam.grade}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{exam.percentage.toFixed(2)}%</p>

            <p className="text-xs text-muted-foreground">
              {exam.obtainedMarks} / {exam.totalMarks} marks
            </p>
          </div>

          <span className="text-sm font-medium capitalize">{exam.status}</span>
        </div>
      </CardContent>
    </Card>
  );
}
