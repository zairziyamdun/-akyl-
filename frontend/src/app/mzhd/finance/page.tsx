import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_FINANCE_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdFinancePage,
  mzhdFinanceDefinition,
  mzhdFinanceFaq,
} from "@/widgets/mzhd-page";

const FINANCE_PATH = "/mzhd/finance";

export const metadata = createPageMetadata({
  title: MZHD_FINANCE_SEO.title,
  description: MZHD_FINANCE_SEO.description,
  path: FINANCE_PATH,
  keywords: MZHD_FINANCE_SEO.keywords,
});

const financeJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: FINANCE_PATH,
    name: MZHD_FINANCE_SEO.title,
    description: MZHD_FINANCE_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Финансовое управление МЖД", path: FINANCE_PATH },
  ]),
  faqPageJsonLd(FINANCE_PATH, mzhdFinanceFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(FINANCE_PATH)}/#defined-term`,
    name: "Финансовое управление МЖД",
    description: mzhdFinanceDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdFinanceRoutePage() {
  return (
    <>
      <JsonLd data={financeJsonLd} />
      <MzhdFinancePage />
    </>
  );
}
