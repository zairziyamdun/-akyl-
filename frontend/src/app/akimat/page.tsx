import type { Metadata } from "next";

import {
  AkimatAnalyticsSection,
  AkimatBenefitsSection,
  AkimatControlSection,
  AkimatCtaSection,
  AkimatHeroSection,
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
      <AkimatBenefitsSection />
      <AkimatControlSection />
      <AkimatAnalyticsSection />
      <AkimatCtaSection />
    </main>
  );
}
