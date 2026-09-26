import type { UserRole } from "@/constants/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  photo?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  permissions?: string[];
}