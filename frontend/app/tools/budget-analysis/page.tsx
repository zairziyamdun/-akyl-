import type { Metadata } from "next";

import { BudgetAnalysisDashboard } from "@/components/sections/tools/budget-analysis/BudgetAnalysisDashboard";

export const metadata: Metadata = {
  title: "Анализ бюджета | Инструменты AKYL",
  description:
    "План-факт анализ бюджета МЖД: отклонения, KPI бюджета, визуализация структуры расходов и управленческий вывод.",
};

export default function BudgetAnalysisPage() {
  return <BudgetAnalysisDashboard />;
}
