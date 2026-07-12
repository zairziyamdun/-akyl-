import { DashboardShell } from "@/widgets/dashboard-shell";

export default function AppCabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
