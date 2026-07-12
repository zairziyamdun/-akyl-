import { ConsultationForm } from "@/features/submit-consultation";
import { ConsultationHero } from "./ConsultationHero";
import {
  ConsultationFinalCta,
  ConsultationFormats,
  ConsultationForWhom,
  ConsultationProblems,
  ConsultationResults,
  ConsultationSteps,
} from "./ConsultationSections";

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
