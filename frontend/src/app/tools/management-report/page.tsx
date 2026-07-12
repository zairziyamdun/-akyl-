import type { Metadata } from "next";

import { ManagementReportHero } from "@/widgets/tools-page/sections/management-report/ManagementReportHero";
import { ManagementReportIntro } from "@/widgets/tools-page/sections/management-report/ManagementReportIntro";
import { ManagementReportOverviewCards } from "@/widgets/tools-page/sections/management-report/ManagementReportOverviewCards";
import { ManagementReportConstructor } from "@/widgets/tools-page/sections/management-report/ManagementReportConstructor";
import { HowToUseManagementReport } from "@/widgets/tools-page/sections/management-report/HowToUseManagementReport";
import { ManagementReportNextTools } from "@/widgets/tools-page/sections/management-report/ManagementReportNextTools";

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

