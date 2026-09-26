"use client";

import Link from "next/link";
import {
  CalendarDays,
  CreditCard,
  IndianRupee,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { FeePayment } from "@/types/fee";

interface PaymentHistoryCardProps {
  payment: FeePayment;
}

export function PaymentHistoryCard({ payment }: PaymentHistoryCardProps) {
  const statusVariant =
    payment.status === "success"
      ? "default"
      : payment.status === "failed"
        ? "destructive"
        : "secondary";

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />

            <span className="text-xl font-bold">
              ₹{payment.amount.toLocaleString("en-IN")}
            </span>

            <Badge variant={statusVariant}>{payment.status}</Badge>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="capitalize">
                {payment.paymentMethod.replace("_", " ")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(payment.paymentDate).toLocaleDateString("en-IN")}
              </span>
            </div>

            {payment.transactionId && (
              <p>
                Transaction ID:{" "}
                <span className="font-medium text-foreground">
                  {payment.transactionId}
                </span>
              </p>
            )}

            {payment.paymentReference && (
              <p>
                Reference:{" "}
                <span className="font-medium text-foreground">
                  {payment.paymentReference}
                </span>
              </p>
            )}

            {payment.remarks && <p>Remarks: {payment.remarks}</p>}
          </div>
        </div>

        {payment.status === "success" && (
          <Button variant="outline">
            <Link
              href={`/fee-payments/${payment.id}/receipt`}
              className="flex items-center"
            >
              <ReceiptText className="mr-2 h-4 w-4" />
              View Receipt
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
