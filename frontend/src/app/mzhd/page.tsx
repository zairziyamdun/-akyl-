import type { Metadata } from "next";

import {
  MzhdArchitecturePreviewSection,
  MzhdAudienceSection,
  MzhdCtaSection,
  MzhdHeroSection,
  MzhdIeuSection,
  MzhdMethodologySection,
  MzhdProblemsSection,
  MzhdSystemSection,
} from "@/widgets/mzhd-page";

export const metadata: Metadata = {
  title: "Управление МЖД | AKYL",
  description:
    "Методология AKYL объединяет архитектуру управления, роли участников, бизнес-процессы, финансы, KPI и цифровые инструменты в единую систему управления многоквартирным домом.",
};

export default function MzhdPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-slate-50 text-slate-900">
      <MzhdHeroSection />
      <MzhdProblemsSection />
      <MzhdSystemSection />
      <MzhdMethodologySection />
      <MzhdArchitecturePreviewSection />
      <MzhdIeuSection />
      <MzhdAudienceSection />
      <MzhdCtaSection />
    </main>
  );
}
