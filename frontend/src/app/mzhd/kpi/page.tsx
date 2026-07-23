import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_KPI_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdKpiPage,
  mzhdKpiDefinition,
  mzhdKpiFaq,
} from "@/widgets/mzhd-page";

const KPI_PATH = "/mzhd/kpi";

export const metadata = createPageMetadata({
  title: MZHD_KPI_SEO.title,
  description: MZHD_KPI_SEO.description,
  path: KPI_PATH,
  keywords: MZHD_KPI_SEO.keywords,
});

const kpiJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: KPI_PATH,
    name: MZHD_KPI_SEO.title,
    description: MZHD_KPI_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "KPI и эффективность управления", path: KPI_PATH },
  ]),
  faqPageJsonLd(KPI_PATH, mzhdKpiFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(KPI_PATH)}/#defined-term`,
    name: "KPI управления МЖД",
    description: mzhdKpiDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdKpiRoutePage() {
  return (
    <>
      <JsonLd data={kpiJsonLd} />
      <MzhdKpiPage />
    </>
  );
}
