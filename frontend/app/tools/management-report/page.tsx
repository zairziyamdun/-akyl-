import type { Metadata } from "next";

import { ManagementReportHero } from "@/components/sections/tools/management-report/ManagementReportHero";
import { ManagementReportIntro } from "@/components/sections/tools/management-report/ManagementReportIntro";
import { ManagementReportOverviewCards } from "@/components/sections/tools/management-report/ManagementReportOverviewCards";
import { ManagementReportConstructor } from "@/components/sections/tools/management-report/ManagementReportConstructor";
import { HowToUseManagementReport } from "@/components/sections/tools/management-report/HowToUseManagementReport";
import { ManagementReportNextTools } from "@/components/sections/tools/management-report/ManagementReportNextTools";

export const metadata: Metadata = {
  title: "Управленческий отчет МЖД | Инструменты AKYL",
  description:
    "Интерактивный управленческий отчет МЖД: период, разделы и KPI, preview структуры отчета, аналитический вывод и рекомендации.",
};

export default function ManagementReportPage() {
  return (
    <main className="bg-white text-slate-900">
      <ManagementReportHero />
      <ManagementReportIntro />
      <ManagementReportOverviewCards />
      <ManagementReportConstructor />
      <HowToUseManagementReport />
      <ManagementReportNextTools />
    </main>
  );
}

