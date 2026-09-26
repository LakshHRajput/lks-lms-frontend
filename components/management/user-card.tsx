"use client";

import Link from "next/link";

import { Mail, Phone, UserRound } from "lucide-react";

import type { ManagedUser } from "@/types/user";

interface UserCardProps {
  user: ManagedUser;
}

function getRoleLabel(role: ManagedUser["role"]) {
  return role
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">{user.name}</h3>

            <p className="text-sm text-muted-foreground">
              {getRoleLabel(user.role)}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : user.status === "blocked"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Details */}

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />

          <span className="truncate">{user.email}</span>
        </div>

        {user.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {user.phone}
          </div>
        )}
      </div>

      {/* Profile */}

      <Link
        href={`/users/${user.id}`}
        className="mt-5 block rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-muted"
      >
        View User
      </Link>
    </div>
  );
}
