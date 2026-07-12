import { MzhdProcessesCtaSection } from "./MzhdProcessesCtaSection";
import { MzhdProcessesFinanceSection } from "./MzhdProcessesFinanceSection";
import { MzhdProcessesHeroSection } from "./MzhdProcessesHeroSection";
import { MzhdProcessesOperationsSection } from "./MzhdProcessesOperationsSection";
import { MzhdProcessesRequestsSection } from "./MzhdProcessesRequestsSection";

export function MzhdProcessesPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdProcessesHeroSection />
      <MzhdProcessesRequestsSection />
      <MzhdProcessesOperationsSection />
      <MzhdProcessesFinanceSection />
      <MzhdProcessesCtaSection />
    </main>
  );
}
