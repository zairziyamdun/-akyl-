import type { Metadata } from "next";

import {
  EducationAudienceSection,
  EducationCtaSection,
  EducationFormatsSection,
  EducationHeroSection,
  EducationProgramsSection,
} from "@/widgets/education-page";

export const metadata: Metadata = {
  title: "Обучение | AKYL",
  description:
    "Практические программы для управляющих компаний, ОСИ, советов домов и специалистов ЖКХ.",
};

export default function EducationPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <EducationHeroSection />
      <EducationProgramsSection />
      <EducationFormatsSection />
      <EducationAudienceSection />
      <EducationCtaSection />
    </main>
  );
}
