"use client";

import { CalendarDays, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import type { Attendance } from "@/types/attendance";

interface AttendanceCardProps {
  attendance: Attendance;
}

const statusVariant = {
  present: "default",
  absent: "destructive",
  late: "secondary",
  leave: "outline",
} as const;

export function AttendanceCard({
  attendance,
}: AttendanceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <h3 className="font-semibold">
            {attendance.studentName ?? "Unknown Student"}
          </h3>

          {attendance.admissionNumber && (
            <p className="text-sm text-muted-foreground">
              Admission No: {attendance.admissionNumber}
            </p>
          )}
        </div>

        <Badge variant={statusVariant[attendance.status]}>
          {attendance.status.replace("_", " ").toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {attendance.className && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              Class {attendance.className}
              {attendance.section
                ? ` - ${attendance.section}`
                : ""}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{attendance.date}</span>
        </div>

        {attendance.remarks && (
          <div className="rounded-lg bg-muted p-3 text-sm">
            <span className="font-medium">Remarks: </span>
            {attendance.remarks}
          </div>
        )}
      </CardContent>
    </Card>
  );
}