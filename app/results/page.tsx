"use client";

import Link from "next/link";
import { BarChart3, Eye, Plus, Search } from "lucide-react";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

type ResultStatus = "pass" | "fail";

interface Result {
  id: string;
  studentName: string;
  admissionNumber: string;
  testName: string;
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: ResultStatus;
  examDate: string;
}

const results: Result[] = [];

export default function ResultsPage() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TEACHER";

  const filteredResults = results.filter((result) => {
    const query = search.toLowerCase();

    return (
      result.studentName.toLowerCase().includes(query) ||
      result.admissionNumber.toLowerCase().includes(query) ||
      result.testName.toLowerCase().includes(query) ||
      result.subject.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 size={28} className="text-primary" />

              <h1 className="text-2xl font-bold tracking-tight">Results</h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage student examination results.
            </p>
          </div>

          {canManage && (
            <Button>
              <Link href="/tests">
                <Plus size={16} />
                Manage Tests
              </Link>
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="rounded-xl border bg-background p-4">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, test or subject..."
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-hidden rounded-xl border bg-background">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold">Examination Results</h2>

            <p className="text-sm text-muted-foreground">
              {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredResults.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <BarChart3 size={28} className="text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No results found</h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Student examination results will appear here after tests are
                completed and evaluated.
              </p>

              {canManage && (
                <Button variant="outline" className="mt-4">
                  <Link href="/tests">Go to Tests</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225 text-sm">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Student</th>

                    <th className="px-5 py-3 text-left font-medium">Test</th>

                    <th className="px-5 py-3 text-left font-medium">Subject</th>

                    <th className="px-5 py-3 text-left font-medium">Marks</th>

                    <th className="px-5 py-3 text-left font-medium">
                      Percentage
                    </th>

                    <th className="px-5 py-3 text-left font-medium">Status</th>

                    <th className="px-5 py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredResults.map((result) => (
                    <tr
                      key={result.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium">{result.studentName}</p>

                          <p className="text-xs text-muted-foreground">
                            {result.admissionNumber}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">{result.testName}</td>

                      <td className="px-5 py-4">{result.subject}</td>

                      <td className="px-5 py-4 font-medium">
                        {result.obtainedMarks}/{result.totalMarks}
                      </td>

                      <td className="px-5 py-4">{result.percentage}%</td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            result.status === "pass"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {result.status === "pass" ? "Pass" : "Fail"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Button variant="outline" size="sm">
                          <Link href={`/results/${result.id}`}>
                            <Eye size={15} />
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
