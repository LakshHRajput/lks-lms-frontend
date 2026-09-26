"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Plus,
  ReceiptIndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FeeCard } from "@/components/fees/fee-card";

import { useDeleteFee, useFees } from "@/lib/hooks/use-fees";

import { useAuth } from "@/lib/hooks/use-auth";

import type { FeeStatus } from "@/types/fee";

const statusOptions: {
  label: string;
  value: "" | FeeStatus;
}[] = [
  {
    label: "All Status",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Partial",
    value: "partial",
  },
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Overdue",
    value: "overdue",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

export default function FeesPage() {
  const [status, setStatus] = useState<"" | FeeStatus>("");

  const [search, setSearch] = useState("");

  const { user } = useAuth();

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useFees(
    status
      ? {
          status,
        }
      : undefined,
  );

  const deleteFee = useDeleteFee();

  const fees = useMemo(() => response?.data ?? [], [response?.data]);
  const filteredFees = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return fees;
    }

    return fees.filter((fee) => {
      return (
        fee.studentName?.toLowerCase().includes(searchValue) ||
        fee.admissionNumber?.toLowerCase().includes(searchValue) ||
        fee.feeType.toLowerCase().includes(searchValue)
      );
    });
  }, [fees, search]);

  const summary = useMemo(() => {
    return fees.reduce(
      (result, fee) => {
        result.total += fee.amount;
        result.paid += fee.paidAmount;
        result.due += fee.dueAmount;

        if (fee.status === "overdue") {
          result.overdue += fee.dueAmount;
        }

        return result;
      },
      {
        total: 0,
        paid: 0,
        due: 0,
        overdue: 0,
      },
    );
  }, [fees]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fee?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteFee.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete fee:", error);

      window.alert("Failed to delete fee.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fees</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage student fees and payments.
            </p>
          </div>

          {canManage && (
            <Button>
              <Link href="/fees/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Fee
              </Link>
            </Button>
          )}
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fees</p>

                <p className="mt-1 text-2xl font-bold">
                  ₹{summary.total.toLocaleString("en-IN")}
                </p>
              </div>

              <ReceiptIndianRupee className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>

                <p className="mt-1 text-2xl font-bold">
                  ₹{summary.paid.toLocaleString("en-IN")}
                </p>
              </div>

              <CheckCircle2 className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>

                <p className="mt-1 text-2xl font-bold">
                  ₹{summary.due.toLocaleString("en-IN")}
                </p>
              </div>

              <Clock3 className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>

                <p className="mt-1 text-2xl font-bold">
                  ₹{summary.overdue.toLocaleString("en-IN")}
                </p>
              </div>

              <AlertCircle className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border bg-card p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fee-search">Search</Label>

              <Input
                id="fee-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search student, admission no or fee type..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fee-status">Status</Label>

              <select
                id="fee-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "" | FeeStatus)
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border p-10 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />

            <p className="mt-3 text-sm text-muted-foreground">
              Loading fees...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
            <h2 className="font-semibold">Failed to load fees</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please check your API connection.
            </p>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filteredFees.length === 0 && (
          <div className="rounded-xl border p-10 text-center">
            <h2 className="font-semibold">No fees found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              No fee records match your filters.
            </p>

            {canManage && (
              <Button className="mt-4">
                <Link href="/fees/new" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Fee
                </Link>
              </Button>
            )}
          </div>
        )}

        {/* Fee List */}
        {!isLoading && !isError && filteredFees.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredFees.map((fee) => (
              <FeeCard
                key={fee.id}
                fee={fee}
                canManage={canManage}
                onDelete={canManage ? handleDelete : undefined}
                isDeleting={deleteFee.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
