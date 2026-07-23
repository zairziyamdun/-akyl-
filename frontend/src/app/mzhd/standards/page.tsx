import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_STANDARDS_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdStandardsPage,
  mzhdStandardsDefinition,
  mzhdStandardsFaq,
} from "@/widgets/mzhd-page";

const STANDARDS_PATH = "/mzhd/standards";

export const metadata = createPageMetadata({
  title: MZHD_STANDARDS_SEO.title,
  description: MZHD_STANDARDS_SEO.description,
  path: STANDARDS_PATH,
  keywords: MZHD_STANDARDS_SEO.keywords,
});

const standardsJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: STANDARDS_PATH,
    name: MZHD_STANDARDS_SEO.title,
    description: MZHD_STANDARDS_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Принципы и стандарты", path: STANDARDS_PATH },
  ]),
  faqPageJsonLd(STANDARDS_PATH, mzhdStandardsFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(STANDARDS_PATH)}/#defined-term`,
    name: "Принципы и стандарты управления МЖД",
    description: mzhdStandardsDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdStandardsRoutePage() {
  return (
    <>
      <JsonLd data={standardsJsonLd} />
      <MzhdStandardsPage />
    </>
  );
}
