"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  UserRound,
  Users,
  Briefcase,
} from "lucide-react";

import type { Parent } from "@/types/parent";

interface ParentCardProps {
  parent: Parent;
}

export function ParentCard({
  parent,
}: ParentCardProps) {
  const childrenCount =
    parent.studentIds?.length ?? 0;

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
              {parent.firstName}{" "}
              {parent.lastName}
            </h3>

            <p className="text-sm text-muted-foreground">
              Parent
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            parent.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {parent.status}
        </span>
      </div>

      {/* Information */}

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {parent.phone}
        </div>

        {parent.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />

            <span className="truncate">
              {parent.email}
            </span>
          </div>
        )}

        {parent.occupation && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {parent.occupation}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />

          {childrenCount}{" "}
          {childrenCount === 1
            ? "Child"
            : "Children"}
        </div>
      </div>

      {/* Profile */}

      <Link
        href={`/parents/${parent.id}`}
        className="mt-5 block rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-muted"
      >
        View Profile
      </Link>
    </div>
  );
}