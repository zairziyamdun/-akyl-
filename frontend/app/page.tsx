import { CentralModelGallerySection } from "@/components/sections/CentralModelGallerySection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImplementationStepsSection } from "@/components/sections/ImplementationStepsSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { PracticeTestimonialsSection } from "@/components/sections/PracticeTestimonialsSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { ResultsStatsSection } from "@/components/sections/ResultsStatsSection";
import { SystemSection } from "@/components/sections/SystemSection";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <PillarsSection />
      <SystemSection />
      <ResourcesSection />
      <CentralModelGallerySection />
      <ResultsStatsSection />
      <PracticeTestimonialsSection />
      <ImplementationStepsSection />
      <FinalCtaSection />
    </div>
  );
}
