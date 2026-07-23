import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_ARCHITECTURE_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdArchitecturePage,
  mzhdArchitectureDefinition,
  mzhdArchitectureFaq,
} from "@/widgets/mzhd-page";

const ARCHITECTURE_PATH = "/mzhd/architecture";

export const metadata = createPageMetadata({
  title: MZHD_ARCHITECTURE_SEO.title,
  description: MZHD_ARCHITECTURE_SEO.description,
  path: ARCHITECTURE_PATH,
  keywords: MZHD_ARCHITECTURE_SEO.keywords,
});

const architectureJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: ARCHITECTURE_PATH,
    name: MZHD_ARCHITECTURE_SEO.title,
    description: MZHD_ARCHITECTURE_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Архитектура системы управления", path: ARCHITECTURE_PATH },
  ]),
  faqPageJsonLd(ARCHITECTURE_PATH, mzhdArchitectureFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(ARCHITECTURE_PATH)}/#defined-term`,
    name: "Архитектура системы управления МЖД",
    description: mzhdArchitectureDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdArchitectureRoutePage() {
  return (
    <>
      <JsonLd data={architectureJsonLd} />
      <MzhdArchitecturePage />
    </>
  );
}
