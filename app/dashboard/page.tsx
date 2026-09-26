"use client";

import {
  BookOpen,
  CalendarCheck,
  IndianRupee,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { useAuth } from "@/lib/hooks/use-auth";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}

function DashboardContent() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Students",
      value: "0",
      icon: Users,
      description: "Total students",
    },

    {
      title: "Courses",
      value: "0",
      icon: BookOpen,
      description: "Active courses",
    },

    {
      title: "Attendance",
      value: "0%",
      icon: CalendarCheck,
      description: "Overall attendance",
    },

    {
      title: "Fees",
      value: "₹0",
      icon: IndianRupee,
      description: "Pending fees",
    },
  ];

  return (
    <div>
      {/* Page heading */}

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening in your LKS LMS.
        </p>
      </div>

      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}

      <div className="mt-6 rounded-xl border bg-background p-5 shadow-sm">
        <h2 className="font-semibold">
          Recent Activity
        </h2>

        <div className="flex min-h-45 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        </div>
      </div>
    </div>
  );
}