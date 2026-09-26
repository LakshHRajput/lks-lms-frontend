"use client";

import {
  CalendarCheck,
  CalendarDays,
  CalendarX,
  Clock3,
  FileClock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AttendanceSummary } from "@/types/attendance";

interface AttendanceSummaryCardProps {
  summary?: AttendanceSummary;
}

export function AttendanceSummaryCard({
  summary,
}: AttendanceSummaryCardProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No attendance data available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const attendancePercentage = Math.min(
    Math.max(summary.attendancePercentage, 0),
    100,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Percentage */}
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Overall Attendance
              </p>

              <p className="mt-1 text-3xl font-bold">
                {attendancePercentage.toFixed(1)}%
              </p>
            </div>

            <CalendarCheck className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${attendancePercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border p-4">
            <CalendarDays className="h-5 w-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Total Days
            </p>

            <p className="text-xl font-bold">
              {summary.totalDays}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <CalendarCheck className="h-5 w-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Present
            </p>

            <p className="text-xl font-bold">
              {summary.presentDays}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <CalendarX className="h-5 w-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Absent
            </p>

            <p className="text-xl font-bold">
              {summary.absentDays}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <Clock3 className="h-5 w-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Late
            </p>

            <p className="text-xl font-bold">
              {summary.lateDays}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <FileClock className="h-5 w-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Leave
            </p>

            <p className="text-xl font-bold">
              {summary.leaveDays}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}