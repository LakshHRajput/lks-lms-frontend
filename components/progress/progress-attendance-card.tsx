import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressAttendanceCardProps {
  percentage?: number;
}

export function ProgressAttendanceCard({
  percentage,
}: ProgressAttendanceCardProps) {
  if (percentage === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Attendance data is not available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{safePercentage.toFixed(2)}%</p>

            <p className="text-sm text-muted-foreground">Overall attendance</p>
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${safePercentage}%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
