import { MzhdFinanceBudgetSection } from "./MzhdFinanceBudgetSection";
import { MzhdFinanceCtaSection } from "./MzhdFinanceCtaSection";
import { MzhdFinanceHeroSection } from "./MzhdFinanceHeroSection";
import { MzhdFinancePlanFactSection } from "./MzhdFinancePlanFactSection";
import { MzhdFinanceReportingSection } from "./MzhdFinanceReportingSection";

export function MzhdFinancePage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdFinanceHeroSection />
      <MzhdFinanceBudgetSection />
      <MzhdFinancePlanFactSection />
      <MzhdFinanceReportingSection />
      <MzhdFinanceCtaSection />
    </main>
  );
}
