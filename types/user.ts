import type { UserRole } from "./auth";

export type UserStatus =
  | "active"
  | "inactive"
  | "blocked";

export interface ManagedUser {
  id: string;

  name: string;
  email: string;

  role: UserRole;

  phone?: string;

  status: UserStatus;

  lastLoginAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
}