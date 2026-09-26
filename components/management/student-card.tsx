"use client";

import Link from "next/link";

import {
  BookOpen,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type { Student } from "@/types/student";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({
  student,
}: StudentCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">
              {student.firstName} {student.lastName}
            </h3>

            <p className="text-sm text-muted-foreground">
              Admission: {student.admissionNumber}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            student.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {student.status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Class {student.className}
          {student.section
            ? ` - ${student.section}`
            : ""}
        </div>

        {student.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {student.email}
          </div>
        )}

        {student.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {student.phone}
          </div>
        )}
      </div>

      <Link
        href={`/students/${student.id}`}
        className="mt-5 block rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-muted"
      >
        View Profile
      </Link>
    </div>
  );
}