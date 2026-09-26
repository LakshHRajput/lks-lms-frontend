"use client";

import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  CalendarDays,
  IndianRupee,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useFee, useFeePayments } from "@/lib/hooks/use-fees";

interface FeeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function FeeDetailPage({ params }: FeeDetailPageProps) {
  const { id } = use(params);

  const { data: feeResponse, isLoading, isError } = useFee(id);

  const { data: paymentsResponse } = useFeePayments(id);

  const fee = feeResponse?.data;
  const payments = paymentsResponse?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading fee...</p>
      </div>
    );
  }

  if (isError || !fee) {
    return (
      <div className="space-y-6 p-6">
        <Button variant="ghost">
          <Link href="/fees" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fees
          </Link>
        </Button>

        <div className="rounded-xl border p-8 text-center">
          <h2 className="font-semibold">Fee not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Button variant="ghost">
        <Link href="/fees" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Fees
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{fee.feeType}</h1>

          {fee.studentName && (
            <p className="mt-1 text-muted-foreground">
              Student: {fee.studentName}
            </p>
          )}
        </div>

        <Badge>{fee.status}</Badge>
      </div>

      {/* Amount Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Fee</p>

          <p className="mt-2 flex items-center text-xl font-bold">
            <IndianRupee className="h-4 w-4" />
            {fee.amount.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Paid</p>

          <p className="mt-2 flex items-center text-xl font-bold">
            <IndianRupee className="h-4 w-4" />
            {fee.paidAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Due</p>

          <p className="mt-2 flex items-center text-xl font-bold">
            <IndianRupee className="h-4 w-4" />
            {fee.dueAmount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Fee Details</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Due Date</p>

            <p className="mt-1 flex items-center gap-2 font-medium">
              <CalendarDays className="h-4 w-4" />
              {new Date(fee.dueDate).toLocaleDateString("en-IN")}
            </p>
          </div>

          {fee.admissionNumber && (
            <div>
              <p className="text-sm text-muted-foreground">Admission Number</p>

              <p className="mt-1 font-medium">{fee.admissionNumber}</p>
            </div>
          )}

          {fee.description && (
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>

              <p className="mt-1">{fee.description}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {fee.dueAmount > 0 && fee.status !== "cancelled" && (
            <Button>
              <Link href={`/fees/${fee.id}/payment`}>Pay Now</Link>
            </Button>
          )}

          <Button variant="outline">
            <Link
              href={`/fees/${fee.id}/payments`}
              className="flex items-center"
            >
              <ReceiptText className="mr-2 h-4 w-4" />
              Payment History
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Payments */}
      {payments.length > 0 && (
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Payments</h2>

            <Button variant="ghost">
              <Link href={`/fees/${fee.id}/payments`}>View All</Link>
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {payments.slice(0, 3).map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {payment.paymentMethod.replace("_", " ")}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(payment.paymentDate).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
