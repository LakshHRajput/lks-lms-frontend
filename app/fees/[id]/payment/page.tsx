"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  QrCode,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useFee, useCreateFeePayment } from "@/lib/hooks/use-fees";

import type { PaymentMethod } from "@/types/fee";

interface PaymentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function FeePaymentPage({ params }: PaymentPageProps) {
  const { id } = use(params);

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [transactionId, setTransactionId] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { data: feeResponse, isLoading, isError } = useFee(id);

  const createPayment = useCreateFeePayment();

  const fee = feeResponse?.data;

  const dueAmount = fee?.dueAmount ?? 0;

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fee) {
      return;
    }

    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      return;
    }

    if (paymentAmount > dueAmount) {
      return;
    }

    try {
      const result = await createPayment.mutateAsync({
        feeId: fee.id,
        amount: paymentAmount,
        paymentMethod,
        transactionId: transactionId.trim() || undefined,
        paymentReference: paymentReference.trim() || undefined,
        paymentDate: new Date().toISOString(),
        remarks: remarks.trim() || undefined,
      });

      if (result.success) {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error("Payment creation failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading payment details...</p>
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
          <h2 className="text-lg font-semibold">Fee not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load this fee record.
          </p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-2xl border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14" />

          <h1 className="mt-4 text-2xl font-bold">Payment Submitted</h1>

          <p className="mt-2 text-muted-foreground">
            Your payment has been submitted successfully.
          </p>

          <div className="mt-6 rounded-xl border p-5 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>

              <span className="font-medium">{fee.feeType}</span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-muted-foreground">Amount</span>

              <span className="font-semibold">
                ₹{Number(amount).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-muted-foreground">Method</span>

              <span className="font-medium capitalize">
                {paymentMethod.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline">
              <Link href={`/fees/${fee.id}`}>View Fee</Link>
            </Button>

            <Button>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (dueAmount <= 0) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-2xl border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12" />

          <h1 className="mt-4 text-2xl font-bold">No Payment Due</h1>

          <p className="mt-2 text-muted-foreground">
            This fee has already been fully paid.
          </p>

          <div className="mt-6">
            <Button>
              <Link href={`/fees/${fee.id}`}>Back to Fee</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Button variant="ghost">
        <Link
          href={`/students/${fee.studentId}/fees`}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Fees
        </Link>
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Pay Fee</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Complete the payment details below.
        </p>
      </div>

      {/* Fee Summary */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Fee Type</p>

            <h2 className="mt-1 text-lg font-semibold">{fee.feeType}</h2>

            {fee.studentName && (
              <p className="mt-1 text-sm text-muted-foreground">
                Student: {fee.studentName}
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Amount Due</p>

            <p className="mt-1 flex items-center justify-end text-2xl font-bold">
              <IndianRupee className="h-5 w-5" />
              {dueAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        {/* Amount */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Payment Amount</h2>

          <div className="mt-4 space-y-2">
            <Label htmlFor="amount">Amount</Label>

            <Input
              id="amount"
              type="number"
              min="1"
              max={dueAmount}
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder={`Maximum ₹${dueAmount}`}
              required
            />

            <p className="text-xs text-muted-foreground">
              Maximum payable amount: ₹{dueAmount.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAmount(String(dueAmount))}
            >
              Pay Full Due Amount
            </Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`rounded-xl border p-4 text-left transition ${
                paymentMethod === "upi"
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <Smartphone className="h-6 w-6" />

              <p className="mt-2 font-semibold">UPI</p>

              <p className="text-sm text-muted-foreground">Pay using UPI</p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("online")}
              className={`rounded-xl border p-4 text-left transition ${
                paymentMethod === "online"
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <QrCode className="h-6 w-6" />

              <p className="mt-2 font-semibold">QR / Online</p>

              <p className="text-sm text-muted-foreground">Online payment</p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`rounded-xl border p-4 text-left transition ${
                paymentMethod === "bank_transfer"
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <CreditCard className="h-6 w-6" />

              <p className="mt-2 font-semibold">Bank Transfer</p>

              <p className="text-sm text-muted-foreground">
                NEFT / IMPS / bank transfer
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`rounded-xl border p-4 text-left transition ${
                paymentMethod === "cash"
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <IndianRupee className="h-6 w-6" />

              <p className="mt-2 font-semibold">Cash</p>

              <p className="text-sm text-muted-foreground">Cash payment</p>
            </button>
          </div>

          {/* UPI / QR placeholder */}
          {(paymentMethod === "upi" || paymentMethod === "online") && (
            <div className="mt-6 rounded-xl border border-dashed p-6 text-center">
              <QrCode className="mx-auto h-16 w-16" />

              <h3 className="mt-3 font-semibold">QR / UPI Payment</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Actual QR code and UPI payment integration will be connected
                with the payment gateway later.
              </p>
            </div>
          )}
        </div>

        {/* Transaction Details */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Payment Details</h2>

          <div className="mt-4 grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>

              <Input
                id="transactionId"
                value={transactionId}
                onChange={(event) => setTransactionId(event.target.value)}
                placeholder="Enter transaction ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentReference">Payment Reference</Label>

              <Input
                id="paymentReference"
                value={paymentReference}
                onChange={(event) => setPaymentReference(event.target.value)}
                placeholder="UPI reference / bank reference"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>

              <Textarea
                id="remarks"
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Optional remarks"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              createPayment.isPending ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > dueAmount
            }
            className="min-w-40"
          >
            {createPayment.isPending ? "Submitting..." : "Confirm Payment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
