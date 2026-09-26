export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
} as const;

export type UserRole =
  (typeof USER_ROLES)[keyof typeof USER_ROLES];