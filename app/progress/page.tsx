"use client";

import Link from "next/link";

import { ArrowRight, FileText } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { ProgressOverviewCard } from "@/components/progress/progress-overview-card";
import { ProgressSubjectCard } from "@/components/progress/progress-subject-card";
import { ProgressExamCard } from "@/components/progress/progress-exam-card";
import { ProgressAttendanceCard } from "@/components/progress/progress-attendance-card";

import LoadingState from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

import { useAuth } from "@/lib/hooks/use-auth";
import {
  useStudentProgressReports,
  useStudentProgressSummary,
} from "@/lib/hooks/use-progress-reports";

export default function ProgressPage() {
  const { user } = useAuth();

  /*
   * Your auth user should contain the student ID.
   *
   * If your backend uses another property,
   * replace user?.studentId accordingly.
   */
  const studentId = user?.studentId;

  const {
    data: reportsData,
    isLoading: reportsLoading,
    isError: reportsError,
    refetch: refetchReports,
  } = useStudentProgressReports(studentId ?? "");

  const { data: summaryData, isLoading: summaryLoading } =
    useStudentProgressSummary(studentId ?? "");

  const reports = reportsData?.data ?? [];
  const summary = summaryData?.data;

  const latestReport = reports[0];

  const isLoading = reportsLoading || summaryLoading;

  if (!studentId) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Student profile not linked"
          description="Your account is not linked with a student profile yet."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Progress</h1>

            <p className="text-sm text-muted-foreground">
              Track your academic performance, exams and attendance.
            </p>
          </div>

          {latestReport && (
            <Link
              href={`/students/${studentId}/progress-reports`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <FileText className="h-4 w-4" />
              Full Progress Report
            </Link>
          )}
        </div>

        {/* Loading */}
        {isLoading && <LoadingState />}

        {/* Error */}
        {reportsError && (
          <ErrorState
            title="Failed to load progress"
            description="Something went wrong while loading your progress data."
            onRetry={() => refetchReports()}
          />
        )}

        {/* Empty */}
        {!isLoading && !reportsError && reports.length === 0 && (
          <EmptyState
            title="No progress report available"
            description="Your progress report will appear here once your academic results are available."
            icon={FileText}
          />
        )}

        {/* Dashboard */}
        {!isLoading && !reportsError && latestReport && (
          <>
            {/* Academic Year */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Academic Year</p>

              <p className="mt-1 text-lg font-semibold">
                {latestReport.academicYear}
              </p>
            </div>

            {/* Overview */}
            <ProgressOverviewCard summary={summary} />

            {/* Attendance */}
            <ProgressAttendanceCard
              percentage={
                summary?.attendancePercentage ??
                latestReport.attendancePercentage
              }
            />

            {/* Subjects */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Subject Performance</h2>

                  <p className="text-sm text-muted-foreground">
                    Your performance in each subject.
                  </p>
                </div>
              </div>

              {latestReport.subjects.length === 0 ? (
                <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                  No subject performance data available.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {latestReport.subjects.map((subject) => (
                    <ProgressSubjectCard
                      key={subject.subjectId}
                      subject={subject}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Exams */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Exam Performance</h2>

                  <p className="text-sm text-muted-foreground">
                    Your recent examination performance.
                  </p>
                </div>
              </div>

              {latestReport.exams.length === 0 ? (
                <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                  No exam performance data available.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {latestReport.exams.map((exam) => (
                    <ProgressExamCard key={exam.examId} exam={exam} />
                  ))}
                </div>
              )}
            </section>

            {/* Remarks */}
            {(latestReport.teacherRemarks || latestReport.principalRemarks) && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Remarks</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {latestReport.teacherRemarks && (
                    <div className="rounded-lg border p-5">
                      <p className="text-sm font-semibold">Teacher Remarks</p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {latestReport.teacherRemarks}
                      </p>
                    </div>
                  )}

                  {latestReport.principalRemarks && (
                    <div className="rounded-lg border p-5">
                      <p className="text-sm font-semibold">Principal Remarks</p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {latestReport.principalRemarks}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Full Report */}
            <div className="flex justify-end">
              <Link
                href={`/students/${studentId}/progress-reports`}
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                View Complete Progress Report
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
