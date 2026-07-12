import {
  ConsultationFinalCta,
  ConsultationForWhom,
  ConsultationFormats,
  ConsultationProblems,
  ConsultationResults,
  ConsultationSteps,
} from "./ConsultationSections";
import { ConsultationForm } from "@/features/submit-consultation";
import { ConsultationHero } from "./ConsultationHero";

export function ConsultationPage() {
  return (
    <div className="bg-white [overflow-x:clip]">
      <ConsultationHero />
      <ConsultationForWhom />
      <ConsultationSteps />
      <ConsultationProblems />
      <ConsultationFormats />
      <ConsultationResults />
      <ConsultationFinalCta />
      <ConsultationForm />
    </div>
  );
}
