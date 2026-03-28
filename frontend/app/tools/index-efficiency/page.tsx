import { IEUBlockAccordions } from "@/components/ieu/IEUBlockAccordions";
import { IEUCalculatorWizard } from "@/components/ieu/IEUCalculatorWizard";
import { IEUCta } from "@/components/ieu/IEUCta";
import { IEUFormula } from "@/components/ieu/IEUFormula";
import { IEUHero } from "@/components/ieu/IEUHero";
import { IEUNotJustNumber } from "@/components/ieu/IEUNotJustNumber";
import { IEUWhatIs } from "@/components/ieu/IEUWhatIs";
import { IEUWhatShows } from "@/components/ieu/IEUWhatShows";
import { IEUWhyMatters } from "@/components/ieu/IEUWhyMatters";

export default function IndexEfficiencyPage() {
  return (
    <main className="bg-white text-slate-900">
      <IEUHero />
      <IEUWhatIs />
      <IEUWhatShows />
      <IEUFormula />
      <IEUBlockAccordions />
      <IEUCalculatorWizard />
      <IEUWhyMatters />
      <IEUNotJustNumber />
      <IEUCta />
    </main>
  );
}
