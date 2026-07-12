import { DashboardShell } from "@/widgets/dashboard-shell";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
