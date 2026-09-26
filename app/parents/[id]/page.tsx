"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Phone,
  UserRound,
  Users,
  Briefcase,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import {
  useParent,
} from "@/lib/hooks/use-parent";

import LoadingState from "@/components/states/loading-state";

import { ErrorState } from "@/components/states/error-state";

interface ParentProfilePageProps {
  params: {
    id: string;
  };
}

export default function ParentProfilePage({
  params,
}: ParentProfilePageProps) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useParent(params.id);

  const parent = data?.data;

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Back */}

        <Link
          href="/parents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Parents
        </Link>

        {/* Loading */}

        {isLoading && <LoadingState />}

        {/* Error */}

        {isError && (
          <ErrorState
            title="Failed to load parent"
            description="Parent information could not be loaded."
            onRetry={() => refetch()}
          />
        )}

        {/* Profile */}

        {!isLoading &&
          !isError &&
          parent && (
            <div className="space-y-8 rounded-xl border bg-card p-6">

              {/* Header */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <UserRound className="h-7 w-7 text-primary" />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold">
                      {parent.firstName}{" "}
                      {parent.lastName}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                      Parent Profile
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                    parent.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {parent.status}
                </span>
              </div>

              {/* Parent Information */}

              <section>

                <h2 className="mb-4 text-lg font-semibold">
                  Parent Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4" />
                      {parent.phone}
                    </p>
                  </div>

                  {parent.email && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email
                      </p>

                      <p className="mt-1 flex items-center gap-2 font-medium">
                        <Mail className="h-4 w-4" />
                        {parent.email}
                      </p>
                    </div>
                  )}

                  {parent.occupation && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Occupation
                      </p>

                      <p className="mt-1 flex items-center gap-2 font-medium">
                        <Briefcase className="h-4 w-4" />
                        {parent.occupation}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Address */}

              {parent.address && (
                <section>

                  <h2 className="mb-3 text-lg font-semibold">
                    Address
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {parent.address}
                  </p>
                </section>
              )}

              {/* Children */}

              <section>

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Children
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Students linked with this parent.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {parent.studentIds &&
                parent.studentIds.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">

                    {parent.studentIds.map(
                      (studentId) => (
                        <Link
                          key={studentId}
                          href={`/students/${studentId}`}
                          className="rounded-lg border p-4 transition hover:bg-muted"
                        >
                          <p className="font-medium">
                            Student
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            ID: {studentId}
                          </p>

                          <p className="mt-3 text-sm text-primary">
                            View Student →
                          </p>
                        </Link>
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground" />

                    <p className="mt-3 font-medium">
                      No children mapped
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Students can be linked with this parent.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}