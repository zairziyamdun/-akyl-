import { MzhdProcessesCtaSection } from "./MzhdProcessesCtaSection";
import { MzhdProcessesDefinitionSection } from "./MzhdProcessesDefinitionSection";
import { MzhdProcessesFaqSection } from "./MzhdProcessesFaqSection";
import { MzhdProcessesFinanceSection } from "./MzhdProcessesFinanceSection";
import { MzhdProcessesHeroSection } from "./MzhdProcessesHeroSection";
import { MzhdProcessesOperationsSection } from "./MzhdProcessesOperationsSection";
import { MzhdProcessesRequestsSection } from "./MzhdProcessesRequestsSection";

export function MzhdProcessesPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdProcessesHeroSection />
      <MzhdProcessesDefinitionSection />
      <MzhdProcessesRequestsSection />
      <MzhdProcessesOperationsSection />
      <MzhdProcessesFinanceSection />
      <MzhdProcessesFaqSection />
      <MzhdProcessesCtaSection />
    </main>
  );
}
