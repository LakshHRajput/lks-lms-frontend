"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Label,
} from "@/components/ui/label";

import { useCreateTest } from "@/lib/hooks/use-tests";

export default function NewTestPage() {
  const router = useRouter();

  const createTest = useCreateTest();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [durationMinutes, setDurationMinutes] =
    useState("30");

  const [totalMarks, setTotalMarks] =
    useState("100");

  const [passingMarks, setPassingMarks] =
    useState("40");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    createTest.mutate(
      {
        title,
        description,
        durationMinutes: Number(durationMinutes),
        totalMarks: Number(totalMarks),
        passingMarks: Number(passingMarks),
        status: "active",
      },
      {
        onSuccess: () => {
          router.push("/tests");
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Create Test
          </h1>

          <p className="text-muted-foreground">
            Create a new test for your students.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">
              Test Title
            </Label>

            <Input
              id="title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Mathematics Chapter 1 Test"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter test description"
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="duration">
                Duration (Minutes)
              </Label>

              <Input
                id="duration"
                type="number"
                min="1"
                value={durationMinutes}
                onChange={(e) =>
                  setDurationMinutes(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalMarks">
                Total Marks
              </Label>

              <Input
                id="totalMarks"
                type="number"
                min="1"
                value={totalMarks}
                onChange={(e) =>
                  setTotalMarks(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingMarks">
                Passing Marks
              </Label>

              <Input
                id="passingMarks"
                type="number"
                min="0"
                value={passingMarks}
                onChange={(e) =>
                  setPassingMarks(e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={createTest.isPending}
            >
              {createTest.isPending
                ? "Creating..."
                : "Create Test"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}