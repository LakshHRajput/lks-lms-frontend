"use client";

import Link from "next/link";
import { CalendarDays, IndianRupee } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Fee } from "@/types/fee";

interface StudentFeeCardProps {
  fee: Fee;
}

const statusVariant = {
  pending: "outline",
  partial: "secondary",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
} as const;

export function StudentFeeCard({ fee }: StudentFeeCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">{fee.feeType}</h2>

            <Badge variant={statusVariant[fee.status]}>
              {fee.status.toUpperCase()}
            </Badge>
          </div>

          {fee.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {fee.description}
            </p>
          )}
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm text-muted-foreground">Total Amount</p>

          <p className="flex items-center font-bold">
            <IndianRupee className="h-4 w-4" />
            {fee.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Paid</p>

          <p className="mt-1 font-semibold">
            ₹{fee.paidAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Due</p>

          <p className="mt-1 font-semibold">
            ₹{fee.dueAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Due Date</p>

          <p className="mt-1 flex items-center gap-2 font-medium">
            <CalendarDays className="h-4 w-4" />
            {fee.dueDate}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="outline">
          <Link href={`/fees/${fee.id}`} className="flex items-center">
            View Details
          </Link>
        </Button>

        {fee.dueAmount > 0 && fee.status !== "cancelled" && (
          <Button>
            <Link
              href={`/fees/${fee.id}/payment`}
              className="flex items-center"
            >
              Pay Now
            </Link>
          </Button>
        )}
        <Button variant="outline">
          <Link href={`/fees/${fee.id}/payments`} className="flex items-center">
            Payment History
          </Link>
        </Button>
      </div>
    </div>
  );
}
