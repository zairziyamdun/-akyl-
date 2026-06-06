import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
