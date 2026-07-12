import { KpiTemplatesCategories } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesCategories";
import { KpiTemplatesCta } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesCta";
import { KpiTemplatesEcosystem } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesEcosystem";
import { KpiTemplatesExamples } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesExamples";
import { KpiTemplatesHero } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesHero";
import { KpiTemplatesHowTo } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesHowTo";
import { KpiTemplatesIncludes } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesIncludes";
import { KpiTemplatesMistakes } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesMistakes";
import { KpiTemplatesResults } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesResults";
import { KpiTemplatesWhatIs } from "@/widgets/tools-page/sections/kpi-templates/KpiTemplatesWhatIs";

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
