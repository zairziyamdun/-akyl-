import type { Metadata } from "next";

import { ChecklistsHero } from "@/components/sections/tools/checklists/ChecklistsHero";
import { ChecklistsIntro } from "@/components/sections/tools/checklists/ChecklistsIntro";
import { ChecklistsInteractive } from "@/components/sections/tools/checklists/ChecklistsInteractive";
import { ChecklistsNextTools } from "@/components/sections/tools/checklists/ChecklistsNextTools";

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
