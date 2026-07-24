import type { Metadata } from "next";

import {
  AkimatAnalyticsSection,
  AkimatCapabilitiesSection,
  AkimatChallengesSection,
  AkimatControlSection,
  AkimatCtaSection,
  AkimatDefinitionSection,
  AkimatHeroSection,
  AkimatOutcomesSection,
  AkimatProgramSection,
} from "@/widgets/akimat-page";

export const metadata: Metadata = {
  title: "Решения для акиматов | AKYL",
  description:
    "Инструменты анализа, контроля и повышения эффективности управления жилищным фондом города.",
};

export default function AkimatPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <AkimatHeroSection />
      <AkimatDefinitionSection />
      <AkimatChallengesSection />
      <AkimatCapabilitiesSection />
      <AkimatControlSection />
      <AkimatAnalyticsSection />
      <AkimatProgramSection />
      <AkimatOutcomesSection />
      <AkimatCtaSection />
    </main>
  );
}
