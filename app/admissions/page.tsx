"use client";

import Link from "next/link";
import { Plus, GraduationCap } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { EmptyState } from "@/components/states/empty-state";

import { useAuth } from "@/lib/hooks/use-auth";

// Temporary type
import type { Admission } from "@/types/admission";

export default function AdmissionsPage() {
  return (
    <DashboardLayout>
      <AdmissionsContent />
    </DashboardLayout>
  );
}

function AdmissionsContent() {
  const { user } = useAuth();

  // Backend connect hone ke baad useAdmissions()
  // yahan use hoga.
  const admissions: Admission[] = [];

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Admissions</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage student admission applications.
          </p>
        </div>

        {canManage && (
          <Link
            href="/admissions/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus size={18} />
            New Admission
          </Link>
        )}
      </div>

      {admissions.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No admissions found"
            description="Create a new student admission to get started."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {admissions.map((admission) => (
            <Link
              key={admission.id}
              href={`/admissions/${admission.id}`}
              className="rounded-xl border bg-background p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <GraduationCap size={22} />
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                  {admission.status}
                </span>
              </div>

              <h2 className="mt-5 font-semibold">{admission.studentName}</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Admission No: {admission.admissionNumber}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Class: {admission.className}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Phone: {admission.phone}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
