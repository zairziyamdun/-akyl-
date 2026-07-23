import { MzhdKpiCategoriesSection } from "./MzhdKpiCategoriesSection";
import { MzhdKpiCtaSection } from "./MzhdKpiCtaSection";
import { MzhdKpiDefinitionSection } from "./MzhdKpiDefinitionSection";
import { MzhdKpiFaqSection } from "./MzhdKpiFaqSection";
import { MzhdKpiHeroSection } from "./MzhdKpiHeroSection";
import { MzhdKpiIeuSection } from "./MzhdKpiIeuSection";
import { MzhdKpiTechnicalSection } from "./MzhdKpiTechnicalSection";

export function MzhdKpiPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdKpiHeroSection />
      <MzhdKpiDefinitionSection />
      <MzhdKpiTechnicalSection />
      <MzhdKpiCategoriesSection />
      <MzhdKpiIeuSection />
      <MzhdKpiFaqSection />
      <MzhdKpiCtaSection />
    </main>
  );
}
