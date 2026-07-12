import type { Metadata } from "next";

import { ConsultationPage } from "@/widgets/consultation-page";

export const metadata: Metadata = {
  title: "Консультация | AKYL",
  description:
    "Консультация по профессиональному управлению МЖД: диагностика, аудит, рекомендации по KPI и план внедрения системы AKYL.",
};

export default function ConsultationRoutePage() {
  return <ConsultationPage />;
}
