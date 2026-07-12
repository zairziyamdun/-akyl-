import { DashboardShell } from "@/widgets/dashboard-shell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
