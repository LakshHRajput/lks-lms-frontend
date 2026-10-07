"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, ArrowDownToLine, ArrowUpRight, BookOpenCheck, CalendarCheck2, CircleDollarSign, GraduationCap, UsersRound } from "lucide-react";
import gsap from "gsap";

import { useAuth } from "@/lib/hooks/use-auth";
import { reportService } from "@/lib/api/services/report.service";

type DashboardData =
  | { kind: "admin"; data: Awaited<ReturnType<typeof reportService.getOverview>> }
  | { kind: "teacher"; data: Awaited<ReturnType<typeof reportService.getAssessments>> }
  | { kind: "student"; data: Awaited<ReturnType<typeof reportService.getMyProgress>> }
  | { kind: "limited" };

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function Metric({ icon: Icon, label, value, detail, accent = false }: {
  icon: typeof Activity;
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-5" data-dashboard-enter>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tabular-nums">{value}</p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-md ${accent ? "bg-accent/10 text-accent" : "bg-secondary text-primary"}`}>
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}

export function LiveDashboard() {
  const { user } = useAuth();
  const pageRef = useRef<HTMLDivElement>(null);
  const [exportError, setExportError] = useState("");

  const query = useQuery({
    queryKey: ["dashboard", user?.role],
    enabled: Boolean(user),
    queryFn: async (): Promise<DashboardData> => {
      if (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") {
        return { kind: "admin", data: await reportService.getOverview() };
      }
      if (user?.role === "TEACHER") return { kind: "teacher", data: await reportService.getAssessments() };
      if (user?.role === "STUDENT") return { kind: "student", data: await reportService.getMyProgress() };
      return { kind: "limited" };
    },
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo("[data-dashboard-enter]", { autoAlpha: 0, y: 14 }, {
        autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out",
      });
    }, pageRef);
    return () => context.revert();
  }, [query.data?.kind]);

  const attendanceData = useMemo(() => query.data?.kind === "admin"
    ? query.data.data.attendance.map((item) => ({
        name: item.status.toLowerCase().replace(/^./, (letter) => letter.toUpperCase()),
        records: item.count,
      }))
    : [], [query.data]);

  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";
  const admin = query.data?.kind === "admin" ? query.data.data : null;
  const teacher = query.data?.kind === "teacher" ? query.data.data : null;
  const student = query.data?.kind === "student" ? query.data.data : null;
  const students = admin?.users.find((item) => item.role === "STUDENT")?.activeCount ?? 0;
  const totalAttendance = admin?.attendance.reduce((sum, item) => sum + item.count, 0) ?? 0;
  const present = admin?.attendance.find((item) => item.status === "PRESENT")?.count ?? 0;
  const attendanceRate = totalAttendance ? Math.round((present / totalAttendance) * 100) : 0;
  const submittedAttempts = admin?.attempts
    .filter((item) => item.status !== "IN_PROGRESS")
    .reduce((sum, item) => sum + item.count, 0) ?? 0;

  return (
    <div ref={pageRef} className="mx-auto w-full max-w-7xl space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end" data-dashboard-enter>
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <span className="size-2 rounded-full bg-accent" /> LKS learning operations
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Good to see you, {firstName}.</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {admin ? "A live view of learning, attendance and finance across your institute." : "Your learning activity and next steps, all in one place."}
          </p>
        </div>
        {admin && (
          <button type="button" onClick={async () => {
            setExportError("");
            try { await reportService.downloadAssessmentCsv(); }
            catch { setExportError("Report export failed. Try again in a moment."); }
          }} className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md border border-border bg-card px-4 text-sm font-medium transition hover:border-primary/40 hover:bg-secondary sm:self-auto">
            <ArrowDownToLine size={16} aria-hidden="true" /> Export assessments
          </button>
        )}
      </section>

      {exportError && <p role="alert" className="text-sm text-destructive">{exportError}</p>}

      {query.isLoading && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading dashboard">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-lg border border-border bg-card" />)}
      </div>}

      {query.isError && <div role="alert" className="rounded-lg border border-accent/30 bg-card p-5">
        <p className="font-medium">Dashboard data could not be loaded.</p>
        <p className="mt-1 text-sm text-muted-foreground">Check the backend connection and retry.</p>
        <button type="button" onClick={() => void query.refetch()} className="mt-4 text-sm font-semibold text-primary hover:underline">Retry</button>
      </div>}

      {admin && <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={UsersRound} label="Active students" value={students.toLocaleString("en-IN")} detail="Current active student accounts" />
          <Metric icon={CalendarCheck2} label="Attendance" value={`${attendanceRate}%`} detail={`${totalAttendance.toLocaleString("en-IN")} records in period`} accent />
          <Metric icon={CircleDollarSign} label="Outstanding fees" value={money.format(admin.fees.outstandingAmount)} detail={`${money.format(admin.fees.paidAmount)} collected in period`} />
          <Metric icon={BookOpenCheck} label="Learning progress" value={`${Math.round(admin.learningProgress.averagePercent)}%`} detail={`${admin.learningProgress.completedEntries} chapters completed`} accent />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-lg border border-border bg-card p-5" data-dashboard-enter>
            <div className="flex items-start justify-between gap-3">
              <div><h2 className="text-base font-semibold">Attendance snapshot</h2><p className="mt-1 text-sm text-muted-foreground">Records in the current reporting period</p></div>
              <Activity className="text-primary" size={18} aria-hidden="true" />
            </div>
            <div className="mt-5 h-64" role="img" aria-label="Attendance record counts by status">
              {attendanceData.length ? <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "var(--secondary)" }} contentStyle={{ borderRadius: 8, borderColor: "var(--border)" }} />
                  <Bar dataKey="records" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No attendance records in this period.</div>}
            </div>
          </section>
          <section className="rounded-lg border border-border bg-card p-5" data-dashboard-enter>
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-base font-semibold">Assessment activity</h2><p className="mt-1 text-sm text-muted-foreground">Attempt status totals</p></div><GraduationCap className="text-accent" size={19} aria-hidden="true" /></div>
            <p className="mt-7 text-4xl font-semibold tabular-nums">{submittedAttempts.toLocaleString("en-IN")}</p>
            <p className="mt-1 text-sm text-muted-foreground">submitted attempts</p>
            <div className="mt-6 space-y-3">{admin.attempts.length ? admin.attempts.map((item) => <div key={item.status} className="flex items-center justify-between border-t border-border pt-3 text-sm"><span className="capitalize text-muted-foreground">{item.status.toLowerCase().replaceAll("_", " ")}</span><span className="font-semibold tabular-nums">{item.count}</span></div>) : <p className="text-sm text-muted-foreground">No attempts in this period.</p>}</div>
          </section>
        </div>
      </>}

      {teacher && <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={BookOpenCheck} label="Assigned tests" value={String(teacher.summary.tests)} detail="Across your assigned subjects" />
          <Metric icon={Activity} label="Attempts" value={String(teacher.summary.attempts)} detail="Student attempts in your tests" accent />
          <Metric icon={ArrowUpRight} label="Submitted" value={String(teacher.summary.submittedAttempts)} detail={`${teacher.summary.completionRate}% completion`} />
          <Metric icon={GraduationCap} label="Completion rate" value={`${teacher.summary.completionRate}%`} detail="Submitted out of started attempts" accent />
        </div>
        <section className="overflow-hidden rounded-lg border border-border bg-card" data-dashboard-enter>
          <div className="border-b border-border px-5 py-4"><h2 className="font-semibold">Your assessments</h2><p className="mt-1 text-sm text-muted-foreground">Performance for subjects assigned to you</p></div>
          {teacher.data.length ? teacher.data.map((report) => <div key={report.testId} className="flex flex-col gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">{report.title}</p><p className="mt-1 text-xs text-muted-foreground">{report.subject.course.name} / {report.subject.name}</p></div><div className="flex gap-5 text-sm"><span><strong className="tabular-nums">{report.attempts}</strong> <span className="text-muted-foreground">attempts</span></span><span><strong className="tabular-nums">{report.averagePercentage === null ? "—" : `${report.averagePercentage}%`}</strong> <span className="text-muted-foreground">average</span></span></div></div>) : <p className="px-5 py-10 text-center text-sm text-muted-foreground">No assigned assessment activity yet.</p>}
        </section>
      </>}

      {student && <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Metric icon={Activity} label="Average progress" value={`${Math.round(student.averageProgress)}%`} detail="Across your tracked chapters" accent />
          <Metric icon={BookOpenCheck} label="Completed chapters" value={String(student.completedChapters)} detail="Marked complete in your learning record" />
          <Metric icon={GraduationCap} label="Learning topics" value={String(student.totalEntries)} detail="Chapters with recorded progress" accent />
        </div>
        <section className="overflow-hidden rounded-lg border border-border bg-card" data-dashboard-enter>
          <div className="border-b border-border px-5 py-4"><h2 className="font-semibold">Continue learning</h2><p className="mt-1 text-sm text-muted-foreground">Your recently accessed chapters</p></div>
          {student.entries.length ? student.entries.slice(0, 6).map((entry) => <div key={entry.id} className="flex items-center justify-between gap-5 border-b border-border px-5 py-4 last:border-b-0"><div className="min-w-0"><p className="truncate font-medium">{entry.chapter.title}</p><p className="mt-1 text-xs text-muted-foreground">{entry.chapter.subject.name}</p></div><div className="flex w-28 shrink-0 items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${entry.progress}%` }} /></div><span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{entry.progress}%</span></div></div>) : <p className="px-5 py-10 text-center text-sm text-muted-foreground">Your chapter progress will appear here as you learn.</p>}
        </section>
      </>}

      {query.data?.kind === "limited" && <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground" data-dashboard-enter>Dashboard reporting is not available for this account role yet. Use the navigation to open available learning areas.</div>}
    </div>
  );
}