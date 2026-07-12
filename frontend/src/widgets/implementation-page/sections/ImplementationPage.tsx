"use client";

import { ImplementationBeforeAfter } from "./ImplementationBeforeAfter";
import { ImplementationFinalCta } from "./ImplementationFinalCta";
import { ImplementationForWhom } from "./ImplementationForWhom";
import { ImplementationHero } from "./ImplementationHero";
import { ImplementationPilot } from "./ImplementationPilot";
import { ImplementationProblems } from "./ImplementationProblems";
import { ImplementationRoadmap } from "./ImplementationRoadmap";
import { ImplementationToolsConnection } from "./ImplementationToolsConnection";

export function ImplementationPage() {
  return (
    <div className="min-w-0 overflow-x-hidden text-stone-900">
      <ImplementationHero />
      <ImplementationProblems />
      <ImplementationRoadmap />
      <ImplementationBeforeAfter />
      <ImplementationPilot />
      <ImplementationForWhom />
      <ImplementationToolsConnection />
      <ImplementationFinalCta />
    </div>
  );
}
