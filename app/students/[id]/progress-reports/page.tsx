"use client";

import Link from "next/link";
import { use } from "react";

import {
  ArrowLeft,
  CalendarCheck,
  Printer,
  FileText,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useStudent } from "@/lib/hooks/use-students";
import {
  useStudentProgressReports,
  useStudentProgressSummary,
} from "@/lib/hooks/use-progress-reports";

import { ProgressReportSummary } from "@/components/progress-repotrs/progress-report-summary";
import { SubjectPerformanceTable } from "@/components/progress-repotrs/subject-performance-table";

interface ProgressReportsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StudentProgressReportsPage({
  params,
}: ProgressReportsPageProps) {
  const { id } = use(params);

  const { data: studentResponse, isLoading: studentLoading } = useStudent(id);

  const {
    data: reportsResponse,
    isLoading: reportsLoading,
    isError: reportsError,
    refetch,
  } = useStudentProgressReports(id);

  const { data: summaryResponse, isLoading: summaryLoading } =
    useStudentProgressSummary(id);

  const student = studentResponse?.data;
  const reports = reportsResponse?.data ?? [];
  const summary = summaryResponse?.data;

  const isLoading = studentLoading || reportsLoading || summaryLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading progress report...</p>
      </div>
    );
  }

  if (reportsError) {
    return (
      <div className="space-y-6 p-6">
        <Button variant="ghost">
          <Link href={`/students/${id}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Student
          </Link>
        </Button>

        <div className="rounded-xl border p-8 text-center">
          <h2 className="font-semibold">Failed to load progress report</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Progress report could not be loaded.
          </p>

          <Button className="mt-4" variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Back */}
      <Button variant="ghost">
        <Link href={`/students/${id}`} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Student
        </Link>
      </Button>

      {/* Student Header */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="h-7 w-7 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {student
                  ? `${student.firstName} ${student.lastName}`
                  : "Student"}
              </h1>

              {student && (
                <p className="text-sm text-muted-foreground">
                  Admission No: {student.admissionNumber}
                </p>
              )}

              {student?.className && (
                <p className="text-sm text-muted-foreground">
                  Class: {student.className}
                  {student.section ? ` - ${student.section}` : ""}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Link
                href={`/students/${id}/attendance`}
                className="flex items-center"
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Attendance
              </Link>
            </Button>

            <Button variant="outline">
              <Link href={`/students/${id}/fees`} className="flex items-center">
                Fees
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <Printer className="h-4 w-4" />
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* No Report */}
      {reports.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">
            No Progress Report Available
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There is currently no progress report for this student.
          </p>
        </div>
      )}

      {reports.length > 0 && (
        <div id="progress-report" className="space-y-6">
          {/* Latest Report */}
          {reports.map((report) => (
            <div key={report.id} className="space-y-6">
              {/* Report Header */}
              <div className="rounded-2xl border bg-card p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">
                    LKS – Learning Knowledge Solution
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Progress Report
                  </p>

                  <p className="mt-2 font-medium">
                    Academic Year: {report.academicYear}
                  </p>
                </div>
              </div>

              {/* Summary */}
              {summary && <ProgressReportSummary summary={summary} />}

              {/* Overall Marks */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-lg font-semibold">Overall Performance</h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>

                    <p className="mt-1 text-xl font-bold">
                      {report.totalMarks}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Obtained Marks
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {report.obtainedMarks}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Percentage</p>

                    <p className="mt-1 text-xl font-bold">
                      {report.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="mb-5 text-lg font-semibold">
                  Subject-wise Performance
                </h2>

                <SubjectPerformanceTable subjects={report.subjects} />
              </div>

              {/* Exam Performance */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="mb-5 text-lg font-semibold">Exam Performance</h2>

                {report.exams.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No exam performance available.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-sm">
                      <thead className="border-b bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left">Exam</th>

                          <th className="px-4 py-3 text-center">Total</th>

                          <th className="px-4 py-3 text-center">Obtained</th>

                          <th className="px-4 py-3 text-center">Percentage</th>

                          <th className="px-4 py-3 text-center">Grade</th>

                          <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {report.exams.map((exam) => (
                          <tr
                            key={exam.examId}
                            className="border-b last:border-b-0"
                          >
                            <td className="px-4 py-4 font-medium">
                              {exam.examTitle}
                            </td>

                            <td className="px-4 py-4 text-center">
                              {exam.totalMarks}
                            </td>

                            <td className="px-4 py-4 text-center">
                              {exam.obtainedMarks}
                            </td>

                            <td className="px-4 py-4 text-center">
                              {exam.percentage.toFixed(2)}%
                            </td>

                            <td className="px-4 py-4 text-center font-semibold">
                              {exam.grade}
                            </td>

                            <td className="px-4 py-4 text-center capitalize">
                              {exam.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Attendance */}
              {report.attendancePercentage !== undefined && (
                <div className="rounded-2xl border bg-card p-6">
                  <h2 className="text-lg font-semibold">Attendance</h2>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Attendance Percentage</span>

                      <span className="font-semibold">
                        {report.attendancePercentage.toFixed(2)}%
                      </span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.min(
                            Math.max(report.attendancePercentage, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              {(report.teacherRemarks || report.principalRemarks) && (
                <div className="rounded-2xl border bg-card p-6">
                  <h2 className="text-lg font-semibold">Remarks</h2>

                  {report.teacherRemarks && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Teacher Remarks</p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.teacherRemarks}
                      </p>
                    </div>
                  )}

                  {report.principalRemarks && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Principal Remarks</p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.principalRemarks}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
