import type { Metadata } from "next";

import { MzhdFinancePage } from "@/widgets/mzhd-page";

export const metadata: Metadata = {
  title: "Финансовое управление МЖД | AKYL",
  description:
    "Бюджетирование, контроль расходов, прозрачная отчётность и финансовая устойчивость дома.",
};

export default function MzhdFinanceRoutePage() {
  return <MzhdFinancePage />;
}
