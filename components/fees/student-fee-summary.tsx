"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ReceiptIndianRupee,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { StudentFeeSummary } from "@/types/fee";

interface StudentFeeSummaryProps {
  summary?: StudentFeeSummary;
}

export function StudentFeeSummary({ summary }: StudentFeeSummaryProps) {
  if (!summary) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No fee summary available.
        </p>
      </div>
    );
  }

  const items = [
    {
      title: "Total Fees",
      value: summary.totalFees,
      icon: ReceiptIndianRupee,
    },
    {
      title: "Total Paid",
      value: summary.totalPaid,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: summary.totalPending,
      icon: Clock3,
    },
    {
      title: "Overdue",
      value: summary.totalOverdue,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <p className="mt-2 text-2xl font-bold">
                    ₹{item.value.toLocaleString("en-IN")}
                  </p>
                </div>

                <Icon className="h-7 w-7 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
