import { MzhdTheoryCtaSection } from "./MzhdTheoryCtaSection";
import { MzhdTheoryCyberneticsSection } from "./MzhdTheoryCyberneticsSection";
import { MzhdTheoryDataSection } from "./MzhdTheoryDataSection";
import { MzhdTheoryFaqSection } from "./MzhdTheoryFaqSection";
import { MzhdTheoryHeroSection } from "./MzhdTheoryHeroSection";
import { MzhdTheoryIntroSection } from "./MzhdTheoryIntroSection";
import { MzhdTheoryPracticeSection } from "./MzhdTheoryPracticeSection";
import { MzhdTheoryPrinciplesSection } from "./MzhdTheoryPrinciplesSection";
import { MzhdTheorySocialSection } from "./MzhdTheorySocialSection";
import { MzhdTheorySubnavSection } from "./MzhdTheorySubnavSection";
import { MzhdTheorySystemSection } from "./MzhdTheorySystemSection";

export function MzhdTheoryPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdTheoryHeroSection />
      <MzhdTheorySubnavSection />
      <MzhdTheoryIntroSection />
      <MzhdTheoryPrinciplesSection />
      <MzhdTheorySystemSection />
      <MzhdTheorySocialSection />
      <MzhdTheoryCyberneticsSection />
      <MzhdTheoryDataSection />
      <MzhdTheoryPracticeSection />
      <MzhdTheoryFaqSection />
      <MzhdTheoryCtaSection />
    </main>
  );
}
