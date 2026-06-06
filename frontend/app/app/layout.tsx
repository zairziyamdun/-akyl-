import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function AppCabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
