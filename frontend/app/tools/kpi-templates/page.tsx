import { KpiTemplatesCategories } from "@/components/sections/tools/kpi-templates/KpiTemplatesCategories";
import { KpiTemplatesCta } from "@/components/sections/tools/kpi-templates/KpiTemplatesCta";
import { KpiTemplatesEcosystem } from "@/components/sections/tools/kpi-templates/KpiTemplatesEcosystem";
import { KpiTemplatesExamples } from "@/components/sections/tools/kpi-templates/KpiTemplatesExamples";
import { KpiTemplatesHero } from "@/components/sections/tools/kpi-templates/KpiTemplatesHero";
import { KpiTemplatesHowTo } from "@/components/sections/tools/kpi-templates/KpiTemplatesHowTo";
import { KpiTemplatesIncludes } from "@/components/sections/tools/kpi-templates/KpiTemplatesIncludes";
import { KpiTemplatesMistakes } from "@/components/sections/tools/kpi-templates/KpiTemplatesMistakes";
import { KpiTemplatesResults } from "@/components/sections/tools/kpi-templates/KpiTemplatesResults";
import { KpiTemplatesWhatIs } from "@/components/sections/tools/kpi-templates/KpiTemplatesWhatIs";

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
