import { KpiTemplatesCategories } from "@/components/tools/kpi-templates/KpiTemplatesCategories";
import { KpiTemplatesCta } from "@/components/tools/kpi-templates/KpiTemplatesCta";
import { KpiTemplatesEcosystem } from "@/components/tools/kpi-templates/KpiTemplatesEcosystem";
import { KpiTemplatesExamples } from "@/components/tools/kpi-templates/KpiTemplatesExamples";
import { KpiTemplatesHero } from "@/components/tools/kpi-templates/KpiTemplatesHero";
import { KpiTemplatesHowTo } from "@/components/tools/kpi-templates/KpiTemplatesHowTo";
import { KpiTemplatesIncludes } from "@/components/tools/kpi-templates/KpiTemplatesIncludes";
import { KpiTemplatesMistakes } from "@/components/tools/kpi-templates/KpiTemplatesMistakes";
import { KpiTemplatesResults } from "@/components/tools/kpi-templates/KpiTemplatesResults";
import { KpiTemplatesWhatIs } from "@/components/tools/kpi-templates/KpiTemplatesWhatIs";

export default function KpiTemplatesPage() {
  return (
    <main className="bg-white text-slate-900">
      <KpiTemplatesHero />
      <KpiTemplatesWhatIs />
      <KpiTemplatesCategories />
      <KpiTemplatesExamples />
      <KpiTemplatesIncludes />
      <KpiTemplatesHowTo />
      <KpiTemplatesMistakes />
      <KpiTemplatesResults />
      <KpiTemplatesEcosystem />
      <KpiTemplatesCta />
    </main>
  );
}
