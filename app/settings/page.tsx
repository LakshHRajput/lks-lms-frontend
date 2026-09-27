"use client";

import { Bell, Lock, Palette, Save, Settings, User } from "lucide-react";
import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

export default function SettingsPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("system");
  const [success, setSuccess] = useState("");

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("Profile settings saved successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2">
            <Settings size={28} className="text-primary" />

            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account and application preferences.
          </p>
        </div>

        {/* Profile Settings */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-5 py-4">
            <User size={20} className="text-primary" />

            <div>
              <h2 className="font-semibold">Profile Settings</h2>

              <p className="text-sm text-muted-foreground">
                Update your personal information.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5 p-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Role</label>

              <div className="mt-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-sm">
                {user?.role ?? "User"}
              </div>
            </div>

            {success && <p className="text-sm text-green-600">{success}</p>}

            <Button type="submit">
              <Save size={16} />
              Save Profile
            </Button>
          </form>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-5 py-4">
            <Bell size={20} className="text-primary" />

            <div>
              <h2 className="font-semibold">Notifications</h2>

              <p className="text-sm text-muted-foreground">
                Manage your notification preferences.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Enable Notifications</p>

              <p className="text-sm text-muted-foreground">
                Receive updates about tests, fees, attendance and other
                activities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  notifications ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-5 py-4">
            <Lock size={20} className="text-primary" />

            <div>
              <h2 className="font-semibold">Security</h2>

              <p className="text-sm text-muted-foreground">
                Manage your account security.
              </p>
            </div>
          </div>

          <div className="p-5">
            <Button variant="outline">Change Password</Button>
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-xl border bg-background">
          <div className="flex items-center gap-3 border-b px-5 py-4">
            <Palette size={20} className="text-primary" />

            <div>
              <h2 className="font-semibold">Appearance</h2>

              <p className="text-sm text-muted-foreground">
                Customize the application appearance.
              </p>
            </div>
          </div>

          <div className="p-5">
            <div className="max-w-sm">
              <label htmlFor="theme" className="text-sm font-medium">
                Theme
              </label>

              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="system">System Default</option>

                <option value="light">Light</option>

                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
