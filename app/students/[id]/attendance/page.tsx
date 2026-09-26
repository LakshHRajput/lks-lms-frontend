"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AttendanceSummaryCard } from "@/components/attendance/attendance-summary-card";
import { MonthlyAttendanceCard } from "@/components/attendance/monthly-attendance-card";

import { useStudent } from "@/lib/hooks/use-students";
import {
  useAttendanceSummary,
  useMonthlyAttendance,
} from "@/lib/hooks/use-attendance";

interface StudentAttendancePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StudentAttendancePage({
  params,
}: StudentAttendancePageProps) {
  const { id } = use(params);

  const { data: studentResponse, isLoading: studentLoading } = useStudent(id);

  const { data: summaryResponse, isLoading: summaryLoading } =
    useAttendanceSummary(id);

  const { data: monthlyResponse, isLoading: monthlyLoading } =
    useMonthlyAttendance(id);

  const student = studentResponse?.data;
  const summary = summaryResponse?.data;
  const monthlyAttendance = monthlyResponse?.data ?? [];

  const isLoading = studentLoading || summaryLoading || monthlyLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin" />

          <p className="mt-3 text-sm text-muted-foreground">
            Loading attendance...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="space-y-6 p-6">
        <Button variant="ghost">
          <Link href={`/students/${id}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Student
          </Link>
        </Button>

        <div className="rounded-xl border p-8 text-center">
          <h2 className="font-semibold">Student not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load student information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost">
            <Link href={`/students/${id}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          <div className="mt-3">
            <h1 className="text-2xl font-bold">
              {student.firstName} {student.lastName}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Admission No: {student.admissionNumber}
            </p>

            <p className="text-sm text-muted-foreground">
              Class {student.className}
              {student.section ? ` - ${student.section}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <AttendanceSummaryCard summary={summary} />

      {/* Monthly */}
      <MonthlyAttendanceCard monthlyAttendance={monthlyAttendance} />
    </div>
  );
}
