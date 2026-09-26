import type { UserRole } from "@/types/auth";

export interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  // Academic
  {
    title: "Admissions",
    href: "/admissions",
    icon: "UserPlus",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
    ],
  },
  {
    title: "Students",
    href: "/students",
    icon: "Users",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
    ],
  },

  {
    title: "Teachers",
    href: "/teachers",
    icon: "GraduationCap",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
    ],
  },

  {
    title: "Courses",
    href: "/courses",
    icon: "BookOpen",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  {
    title: "Subjects",
    href: "/subjects",
    icon: "Library",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  {
    title: "Chapters",
    href: "/chapters",
    icon: "BookMarked",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  {
    title: "Videos",
    href: "/videos",
    icon: "PlayCircle",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  {
    title: "Notes",
    href: "/notes",
    icon: "FileText",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  // Assessment
  {
    title: "Tests",
    href: "/tests",
    icon: "ClipboardCheck",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
    ],
  },

  {
    title: "Results",
    href: "/results",
    icon: "BarChart3",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  {
    title: "Attendance",
    href: "/attendance",
    icon: "CalendarCheck",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },

  // Finance
  {
    title: "Fees",
    href: "/fees",
    icon: "IndianRupee",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "STUDENT",
      "PARENT",
    ],
  },

  // Administration
  {
    title: "Users",
    href: "/users",
    icon: "UserCog",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },
  {
    title: "Progress Reports",
    href: "/progress-reports",
    icon: "ChartNoAxesCombined",
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
    ],
  },
  {
    title: "My Progress",
    href: "/progress",
    icon: "BarChart3",
    roles: [
      "STUDENT",
    ],
  },
];