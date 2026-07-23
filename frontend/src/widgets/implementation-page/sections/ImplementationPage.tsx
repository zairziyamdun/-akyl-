"use client";

import { ImplementationBeforeAfter } from "./ImplementationBeforeAfter";
import { ImplementationDefinitionSection } from "./ImplementationDefinitionSection";
import { ImplementationFaqSection } from "./ImplementationFaqSection";
import { ImplementationFinalCta } from "./ImplementationFinalCta";
import { ImplementationForWhom } from "./ImplementationForWhom";
import { ImplementationHero } from "./ImplementationHero";
import { ImplementationPilot } from "./ImplementationPilot";
import { ImplementationProblems } from "./ImplementationProblems";
import { ImplementationRoadmap } from "./ImplementationRoadmap";
import { ImplementationToolsConnection } from "./ImplementationToolsConnection";

export function ImplementationPage() {
  return (
    <main className="min-w-0 overflow-x-hidden text-stone-900">
      <ImplementationHero />
      <ImplementationDefinitionSection />
      <ImplementationProblems />
      <ImplementationRoadmap />
      <ImplementationBeforeAfter />
      <ImplementationPilot />
      <ImplementationForWhom />
      <ImplementationToolsConnection />
      <ImplementationFaqSection />
      <ImplementationFinalCta />
    </main>
  );
}
