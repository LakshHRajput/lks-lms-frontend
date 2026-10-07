import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { LiveDashboard } from "@/components/dashboard/live-dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <LiveDashboard />
    </DashboardLayout>
  );
}