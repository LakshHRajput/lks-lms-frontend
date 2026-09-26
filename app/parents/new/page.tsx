"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import {
  useCreateParent,
} from "@/lib/hooks/use-parent";

export default function NewParentPage() {
  const router = useRouter();

  const createParent =
    useCreateParent();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
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
      await createParent.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,

        email:
          form.email || undefined,

        phone: form.phone,

        occupation:
          form.occupation || undefined,

        address:
          form.address || undefined,

        status: "active",
      });

      router.push("/parents");
    } catch {
      // Mutation state handles API errors.
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">

        <div>
          <h1 className="text-2xl font-bold">
            Add Parent
          </h1>

          <p className="text-sm text-muted-foreground">
            Create a new parent profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">

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
                className="w-full rounded-lg border bg-background px-3 py-2"
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
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                placeholder="parent@example.com"
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                  )
                }
                placeholder="9876543210"
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            {/* Occupation */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Occupation
              </label>

              <input
                value={form.occupation}
                onChange={(event) =>
                  updateField(
                    "occupation",
                    event.target.value
                  )
                }
                placeholder="Business / Teacher / Engineer"
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>
          </div>

          {/* Address */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <textarea
              rows={4}
              value={form.address}
              onChange={(event) =>
                updateField(
                  "address",
                  event.target.value
                )
              }
              className="w-full rounded-lg border bg-background px-3 py-2"
              placeholder="Enter parent address"
            />
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
              disabled={createParent.isPending}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {createParent.isPending
                ? "Creating..."
                : "Create Parent"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}