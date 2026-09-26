"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { useStudents } from "@/lib/hooks/use-students";
import { useCreateFee } from "@/lib/hooks/use-fees";

export default function NewFeePage() {
  const router = useRouter();

  const [studentId, setStudentId] = useState("");

  const [feeType, setFeeType] = useState("");

  const [description, setDescription] = useState("");

  const [amount, setAmount] = useState("");

  const [dueDate, setDueDate] = useState("");

  const { data: studentsResponse, isLoading: studentsLoading } = useStudents();

  const createFee = useCreateFee();

  const students = studentsResponse?.data ?? [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentId || !feeType || !amount || !dueDate) {
      window.alert("Please fill all required fields.");

      return;
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      window.alert("Please enter a valid fee amount.");

      return;
    }

    try {
      const result = await createFee.mutateAsync({
        studentId,
        feeType,
        description: description || undefined,
        amount: numericAmount,
        dueDate,
      });

      if (result.success) {
        router.push("/fees");
      }
    } catch (error) {
      console.error("Failed to create fee:", error);

      window.alert("Failed to create fee.");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back */}
        <Button variant="ghost">
          <Link href="/fees" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fees
          </Link>
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Add Fee</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a new fee record for a student.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-6"
        >
          {/* Student */}
          <div className="space-y-2">
            <Label htmlFor="student">Student *</Label>

            <select
              id="student"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              disabled={studentsLoading}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">
                {studentsLoading ? "Loading students..." : "Select student"}
              </option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName} —{" "}
                  {student.admissionNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Type */}
          <div className="space-y-2">
            <Label htmlFor="fee-type">Fee Type *</Label>

            <select
              id="fee-type"
              value={feeType}
              onChange={(event) => setFeeType(event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">Select fee type</option>

              <option value="Tuition Fee">Tuition Fee</option>

              <option value="Admission Fee">Admission Fee</option>

              <option value="Exam Fee">Exam Fee</option>

              <option value="Transport Fee">Transport Fee</option>

              <option value="Books Fee">Books Fee</option>

              <option value="Uniform Fee">Uniform Fee</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>

            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Enter amount"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date *</Label>

            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline">
              <Link href="/fees">Cancel</Link>
            </Button>

            <Button type="submit" disabled={createFee.isPending}>
              {createFee.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {createFee.isPending ? "Creating..." : "Create Fee"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
