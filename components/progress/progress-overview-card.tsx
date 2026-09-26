import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProgressReportSummary } from "@/types/progress-report";

interface ProgressOverviewCardProps {
  summary?: ProgressReportSummary;
}

export function ProgressOverviewCard({ summary }: ProgressOverviewCardProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No progress data available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Obtained Marks</p>

            <p className="mt-1 text-2xl font-bold">{summary.obtainedMarks}</p>

            <p className="text-xs text-muted-foreground">
              out of {summary.totalMarks}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Percentage</p>

            <p className="mt-1 text-2xl font-bold">
              {summary.percentage.toFixed(2)}%
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Grade</p>

            <p className="mt-1 text-2xl font-bold">{summary.grade}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="mt-1 text-2xl font-bold capitalize">
              {summary.status}
            </p>
          </div>
        </div>

        {summary.rank !== undefined && (
          <div className="mt-4 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Class Rank</p>

            <p className="mt-1 text-2xl font-bold">#{summary.rank}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
