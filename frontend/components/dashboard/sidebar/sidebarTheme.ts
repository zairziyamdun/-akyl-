/**
 * Dashboard / Sidebar design tokens — aligned with AKYL brand navy (#0c1e3a).
 */
export const dashColors = {
  canvas: "#F4F7FB",
  surface: "#FFFFFF",
  surfaceMuted: "#F8FAFC",
  border: "#E2E8F0",
  borderSubtle: "#EEF2F6",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  textLabel: "#64748B",
  hover: "#F1F5F9",
  hoverStrong: "#E8EEF5",
  iconBg: "#F1F5F9",
  iconBgHover: "#E2E8F0",
  brand: "#0c1e3a",
  brandMid: "#142d52",
  brandLight: "#1a3d6e",
  accent: "#2563EB",
  accentSoft: "#EFF6FF",
  accentMuted: "#DBEAFE",
  activeShadow: "0 4px 16px rgba(12, 30, 58, 0.14)",
  tooltipBg: "#0F172A",
} as const;

export const sidebarActiveGradient =
  "linear-gradient(135deg, #142d52 0%, #0c1e3a 100%)";

export const sidebarSurfaceGradient =
  "linear-gradient(180deg, #FFFFFF 0%, #FAFBFD 100%)";
