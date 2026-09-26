"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { useCreateStudent } from "@/lib/hooks/use-students";

export default function NewStudentPage() {
  const router = useRouter();

  const createStudent = useCreateStudent();

  const [form, setForm] = useState({
    admissionNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "male",
    className: "",
    section: "",
    address: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createStudent.mutateAsync({
        ...form,
        gender: form.gender as "male" | "female" | "other",
      });

      router.push("/students");
    } catch {
      // Error can be handled through mutation state/UI.
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add Student</h1>

          <p className="text-sm text-muted-foreground">
            Create a new student admission record.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Admission Number
              </label>

              <input
                required
                value={form.admissionNumber}
                onChange={(e) => updateField("admissionNumber", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
                placeholder="LKS-2026-001"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                required
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                required
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>

              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Date of Birth
              </label>

              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Gender</label>

              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Class</label>

              <select
                required
                value={form.className}
                onChange={(e) => updateField("className", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
              >
                <option value="">Select Class</option>

                {["6", "7", "8", "9", "10", "11", "12"].map((item) => (
                  <option key={item} value={item}>
                    Class {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Section</label>

              <input
                value={form.section}
                onChange={(e) => updateField("section", e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2"
                placeholder="A"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Address</label>

            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createStudent.isPending}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {createStudent.isPending ? "Creating..." : "Create Student"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
