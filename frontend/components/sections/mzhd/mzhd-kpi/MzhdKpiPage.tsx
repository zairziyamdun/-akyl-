import { MzhdKpiCategoriesSection } from "./MzhdKpiCategoriesSection";
import { MzhdKpiCtaSection } from "./MzhdKpiCtaSection";
import { MzhdKpiHeroSection } from "./MzhdKpiHeroSection";
import { MzhdKpiIeuSection } from "./MzhdKpiIeuSection";
import { MzhdKpiTechnicalSection } from "./MzhdKpiTechnicalSection";

export function MzhdKpiPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdKpiHeroSection />
      <MzhdKpiTechnicalSection />
      <MzhdKpiCategoriesSection />
      <MzhdKpiIeuSection />
      <MzhdKpiCtaSection />
    </main>
  );
}
