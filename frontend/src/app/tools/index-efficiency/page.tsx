import {
  IEUBlockAccordions,
  IEUCalculatorWizard,
  IEUCta,
  IEUFormula,
  IEUHero,
  IEUNotJustNumber,
  IEUWhatIs,
  IEUWhatShows,
  IEUWhyMatters,
} from "@/widgets/tools-page";

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
