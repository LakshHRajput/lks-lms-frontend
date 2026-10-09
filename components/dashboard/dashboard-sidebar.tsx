"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Home,
  LayoutDashboard,
  NotebookPen,
  Settings,
  Users,
  Video,
  X,
  Layers,
  FileText,
} from "lucide-react";

interface DashboardSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Subjects",
    href: "/subjects",
    icon: Layers,
  },
  {
    title: "Chapters",
    href: "/chapters",
    icon: NotebookPen,
  },
  {
    title: "Videos",
    href: "/videos",
    icon: Video,
  },
  {
    title: "Tests",
    href: "/tests",
    icon: ClipboardCheck,
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
  },
  {
    title: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    title: "Admissions",
    href: "/admissions",
    icon: GraduationCap,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar({
  open = true,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={onClose}
          >
             <Image
              src="/images/logo.png"
              alt="Learning Knowledge Solution logo"
              width={50}
              height={50}
              className="h-14 w-14 object-contain"
            />
            
          <p className="hidden text-xs text-muted-foreground sm:block">
            Learning Management System
          </p>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
