import type { Metadata } from "next";

import { ChecklistsHero } from "@/widgets/tools-page/sections/checklists/ChecklistsHero";
import { ChecklistsIntro } from "@/widgets/tools-page/sections/checklists/ChecklistsIntro";
import { ChecklistsInteractive } from "@/widgets/tools-page/sections/checklists/ChecklistsInteractive";
import { ChecklistsNextTools } from "@/widgets/tools-page/sections/checklists/ChecklistsNextTools";

export const metadata: Metadata = {
  title: "Чек-листы оценки управления МЖД | Инструменты AKYL",
  description:
    "Интерактивная самооценка управления МЖД: пять направлений, шкала ответов, прогресс и итог с рекомендациями и связкой с индексом эффективности, бюджетом и KPI.",
};

export default function ChecklistsPage() {
  return (
    <main className="bg-white text-slate-900">
      <ChecklistsHero />
      <ChecklistsIntro />
      <ChecklistsInteractive />
      <ChecklistsNextTools />
    </main>
  );
}
