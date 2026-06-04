import { MzhdArchitectureContoursSection } from "./MzhdArchitectureContoursSection";
import { MzhdArchitectureCtaSection } from "./MzhdArchitectureCtaSection";
import { MzhdArchitectureHeroSection } from "./MzhdArchitectureHeroSection";
import { MzhdArchitectureParticipantsSection } from "./MzhdArchitectureParticipantsSection";
import { MzhdArchitectureProcessesSection } from "./MzhdArchitectureProcessesSection";

export function MzhdArchitecturePage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdArchitectureHeroSection />
      <MzhdArchitectureParticipantsSection />
      <MzhdArchitectureProcessesSection />
      <MzhdArchitectureContoursSection />
      <MzhdArchitectureCtaSection />
    </main>
  );
}
