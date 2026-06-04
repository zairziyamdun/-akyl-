import { MzhdTheoryCtaSection } from "./MzhdTheoryCtaSection";
import { MzhdTheoryDataSection } from "./MzhdTheoryDataSection";
import { MzhdTheoryHeroSection } from "./MzhdTheoryHeroSection";
import { MzhdTheorySocialSection } from "./MzhdTheorySocialSection";
import { MzhdTheorySystemSection } from "./MzhdTheorySystemSection";

export function MzhdTheoryPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <MzhdTheoryHeroSection />
      <MzhdTheorySystemSection />
      <MzhdTheorySocialSection />
      <MzhdTheoryDataSection />
      <MzhdTheoryCtaSection />
    </main>
  );
}
