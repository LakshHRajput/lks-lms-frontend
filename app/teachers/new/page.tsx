"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import {
  useCreateTeacher,
} from "@/lib/hooks/use-teachers";

export default function NewTeacherPage() {
  const router = useRouter();

  const createTeacher =
    useCreateTeacher();

  const [form, setForm] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    specialization: "",
  });

  function updateField(
    field: string,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      await createTeacher.mutateAsync({
        employeeId: form.employeeId,

        firstName: form.firstName,
        lastName: form.lastName,

        email: form.email,
        phone: form.phone || undefined,

        qualification:
          form.qualification || undefined,

        experience:
          form.experience
            ? Number(form.experience)
            : undefined,

        specialization:
          form.specialization || undefined,

        status: "active",
      });

      router.push("/teachers");
    } catch {
      // Mutation state handles API errors.
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-2xl font-bold">
            Add Teacher
          </h1>

          <p className="text-sm text-muted-foreground">
            Create a new teacher profile.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">

            {/* Employee ID */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Employee ID
              </label>

              <input
                required
                value={form.employeeId}
                onChange={(event) =>
                  updateField(
                    "employeeId",
                    event.target.value
                  )
                }
                placeholder="LKS-T-001"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* First Name */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                required
                value={form.firstName}
                onChange={(event) =>
                  updateField(
                    "firstName",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Last Name */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                required
                value={form.lastName}
                onChange={(event) =>
                  updateField(
                    "lastName",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                placeholder="teacher@example.com"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                  )
                }
                placeholder="9876543210"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Qualification */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Qualification
              </label>

              <input
                value={form.qualification}
                onChange={(event) =>
                  updateField(
                    "qualification",
                    event.target.value
                  )
                }
                placeholder="M.Sc, B.Ed"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Experience */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience (Years)
              </label>

              <input
                type="number"
                min="0"
                value={form.experience}
                onChange={(event) =>
                  updateField(
                    "experience",
                    event.target.value
                  )
                }
                placeholder="3"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Specialization */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Specialization
              </label>

              <input
                value={form.specialization}
                onChange={(event) =>
                  updateField(
                    "specialization",
                    event.target.value
                  )
                }
                placeholder="Mathematics"
                className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Actions */}

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
              disabled={createTeacher.isPending}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createTeacher.isPending
                ? "Creating..."
                : "Create Teacher"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}