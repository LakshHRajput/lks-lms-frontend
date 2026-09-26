"use client";

import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { MonthlyAttendance } from "@/types/attendance";

interface MonthlyAttendanceCardProps {
  monthlyAttendance: MonthlyAttendance[];
}

export function MonthlyAttendanceCard({
  monthlyAttendance,
}: MonthlyAttendanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
      </CardHeader>

      <CardContent>
        {monthlyAttendance.length === 0 ? (
          <div className="rounded-lg border p-6 text-center">
            <CalendarDays className="mx-auto h-6 w-6 text-muted-foreground" />

            <p className="mt-2 text-sm text-muted-foreground">
              No monthly attendance data available.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {monthlyAttendance.map((item) => {
              const percentage = Math.min(
                Math.max(item.attendancePercentage, 0),
                100,
              );

              return (
                <div
                  key={`${item.year}-${item.month}`}
                  className="rounded-xl border p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {item.month} {item.year}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.presentDays} present /{" "}
                        {item.totalDays} total days
                      </p>
                    </div>

                    <p className="text-lg font-bold">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div>
                      <span className="text-muted-foreground">
                        Present
                      </span>

                      <p className="font-semibold">
                        {item.presentDays}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Absent
                      </span>

                      <p className="font-semibold">
                        {item.absentDays}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Late
                      </span>

                      <p className="font-semibold">
                        {item.lateDays}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Leave
                      </span>

                      <p className="font-semibold">
                        {item.leaveDays}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}