"use client";

import Link from "next/link";
import { CalendarDays, IndianRupee } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import type { Fee } from "@/types/fee";

interface FeeCardProps {
  fee: Fee;
  canManage?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const statusVariant = {
  pending: "outline",
  partial: "secondary",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
} as const;

export function FeeCard({
  fee,
  canManage = false,
  onDelete,
  isDeleting = false,
}: FeeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{fee.feeType}</h2>

          <p className="text-sm text-muted-foreground">
            {fee.studentName ?? "Unknown Student"}
          </p>

          {fee.admissionNumber && (
            <p className="text-xs text-muted-foreground">
              Admission No: {fee.admissionNumber}
            </p>
          )}
        </div>

        <Badge variant={statusVariant[fee.status]}>
          {fee.status.toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>

            <p className="mt-1 flex items-center font-semibold">
              <IndianRupee className="mr-1 h-4 w-4" />
              {fee.amount.toLocaleString("en-IN")}
            </p>
          </div>

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
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          Due Date: {fee.dueDate}
        </div>

        {fee.description && (
          <p className="text-sm text-muted-foreground">{fee.description}</p>
        )}

        {canManage && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline">
              <Link href={`/fees/${fee.id}`} className="flex items-center">
                View
              </Link>
            </Button>

            <Button variant="outline">
              <Link href={`/fees/${fee.id}/edit`} className="flex items-center">
                Edit
              </Link>
            </Button>

            {onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(fee.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
