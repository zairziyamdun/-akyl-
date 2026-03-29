import { IEUBlockAccordions, IEUCalculatorWizard, IEUCta, IEUFormula, IEUHero, IEUNotJustNumber, IEUWhatIs, IEUWhatShows, IEUWhyMatters } from "@/components/sections/ieu";

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
