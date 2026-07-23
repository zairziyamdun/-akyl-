import { MzhdStandardsCtaSection } from "./MzhdStandardsCtaSection";
import { MzhdStandardsDefinitionSection } from "./MzhdStandardsDefinitionSection";
import { MzhdStandardsFaqSection } from "./MzhdStandardsFaqSection";
import { MzhdStandardsHeroSection } from "./MzhdStandardsHeroSection";
import { MzhdStandardsRegulationsSection } from "./MzhdStandardsRegulationsSection";
import { MzhdStandardsResponsibilitySection } from "./MzhdStandardsResponsibilitySection";
import { MzhdStandardsTransparencySection } from "./MzhdStandardsTransparencySection";

export function MzhdStandardsPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdStandardsHeroSection />
      <MzhdStandardsDefinitionSection />
      <MzhdStandardsTransparencySection />
      <MzhdStandardsResponsibilitySection />
      <MzhdStandardsRegulationsSection />
      <MzhdStandardsFaqSection />
      <MzhdStandardsCtaSection />
    </main>
  );
}
