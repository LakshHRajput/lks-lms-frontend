"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  UserRound,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import type { Teacher } from "@/types/teacher";

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({
  teacher,
}: TeacherCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">
              {teacher.firstName}{" "}
              {teacher.lastName}
            </h3>

            <p className="text-sm text-muted-foreground">
              ID: {teacher.employeeId}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            teacher.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {teacher.status}
        </span>
      </div>

      {/* Information */}

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
        {teacher.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="truncate">
              {teacher.email}
            </span>
          </div>
        )}

        {teacher.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {teacher.phone}
          </div>
        )}

        {teacher.qualification && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            {teacher.qualification}
          </div>
        )}

        {teacher.experience !== undefined && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {teacher.experience} years experience
          </div>
        )}
      </div>

      {/* Specialization */}

      {teacher.specialization && (
        <div className="mt-4">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs">
            {teacher.specialization}
          </span>
        </div>
      )}

      {/* Button */}

      <Link
        href={`/teachers/${teacher.id}`}
        className="mt-5 block rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-muted"
      >
        View Profile
      </Link>
    </div>
  );
}