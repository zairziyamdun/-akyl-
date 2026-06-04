import type { Metadata } from "next";

import { MzhdKpiPage } from "@/components/sections/mzhd/mzhd-kpi";

export const metadata: Metadata = {
  title: "KPI и эффективность управления | AKYL",
  description:
    "Система измеримых показателей для оценки качества управления домом и работы управляющей организации.",
};

export default function MzhdKpiRoutePage() {
  return <MzhdKpiPage />;
}
