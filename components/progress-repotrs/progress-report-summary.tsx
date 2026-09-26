"use client";

import { Award, CheckCircle2, Percent, Trophy } from "lucide-react";

import type { ProgressReportSummary } from "@/types/progress-report";

interface ProgressReportSummaryProps {
  summary: ProgressReportSummary;
}

export function ProgressReportSummary({ summary }: ProgressReportSummaryProps) {
  const percentage = Number(summary.percentage) || 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <Percent className="h-5 w-5" />

          <span className="text-sm text-muted-foreground">Percentage</span>
        </div>

        <p className="mt-3 text-2xl font-bold">{percentage.toFixed(2)}%</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5" />

          <span className="text-sm text-muted-foreground">Grade</span>
        </div>

        <p className="mt-3 text-2xl font-bold">{summary.grade}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5" />

          <span className="text-sm text-muted-foreground">Result</span>
        </div>

        <p className="mt-3 text-2xl font-bold capitalize">{summary.status}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5" />

          <span className="text-sm text-muted-foreground">Rank</span>
        </div>

        <p className="mt-3 text-2xl font-bold">{summary.rank ?? "—"}</p>
      </div>
    </div>
  );
}
