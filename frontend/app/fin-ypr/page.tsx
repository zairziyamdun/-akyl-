import { FinYprAccountingSection } from "@/components/sections/fin-ypr/FinYprAccountingSection";
import { FinYprBenefitsSection } from "@/components/sections/fin-ypr/FinYprBenefitsSection";
import { FinYprFinalCtaSection } from "@/components/sections/fin-ypr/FinYprFinalCtaSection";
import { FinYprHeaderSection } from "@/components/sections/fin-ypr/FinYprHeaderSection";
import { FinYprProcessSection } from "@/components/sections/fin-ypr/FinYprProcessSection";
import { FinYprToolsSection } from "@/components/sections/fin-ypr/FinYprToolsSection";

export default function Page() {
  return (
    <div>
      <FinYprHeaderSection />
      <FinYprAccountingSection />
      <FinYprToolsSection />
      <FinYprBenefitsSection />
      <FinYprProcessSection />
      <FinYprFinalCtaSection />
    </div>
  );
}

