"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  CalendarCheck,
  IndianRupee,
  Phone,
  UserRound,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { useStudent } from "@/lib/hooks/use-students";

import LoadingState from "@/components/states/loading-state";

import { ErrorState } from "@/components/states/error-state";

interface StudentPageProps {
  params: {
    id: string;
  };
}

export default function StudentProfilePage({ params }: StudentPageProps) {
  const { data, isLoading, isError, refetch } = useStudent(params.id);

  const student = data?.data;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </Link>

        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            title="Failed to load student"
            description="Student information could not be loaded."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && student && (
          <div className="rounded-xl border bg-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="h-7 w-7 text-primary" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">
                    {student.firstName} {student.lastName}
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    Admission No: {student.admissionNumber}
                  </p>
                </div>
              </div>

              <Link
                href={`/students/${student.id}/attendance`}
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <CalendarCheck className="h-4 w-4" />
                Attendance
              </Link>

              <Link
                href={`/students/${student.id}/fees`}
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <IndianRupee className="h-4 w-4" />
                Fees
              </Link>
              
            </div>
            

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Class</p>

                <p className="font-medium">
                  Class {student.className}
                  {student.section && ` - ${student.section}`}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>

                <p className="font-medium capitalize">{student.status}</p>
              </div>

              {student.email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>

                  <p className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4" />
                    {student.email}
                  </p>
                </div>
              )}

              {student.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>

                  <p className="flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4" />
                    {student.phone}
                  </p>
                </div>
              )}

              {student.gender && (
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>

                  <p className="font-medium capitalize">{student.gender}</p>
                </div>
              )}

              {student.dateOfBirth && (
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>

                  <p className="font-medium">{student.dateOfBirth}</p>
                </div>
              )}
            </div>

            {student.address && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Address</p>

                <p className="mt-1">{student.address}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
