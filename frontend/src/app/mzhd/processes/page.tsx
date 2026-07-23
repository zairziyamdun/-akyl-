import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_PROCESSES_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdProcessesPage,
  mzhdProcessesDefinition,
  mzhdProcessesFaq,
} from "@/widgets/mzhd-page";

const PROCESSES_PATH = "/mzhd/processes";

export const metadata = createPageMetadata({
  title: MZHD_PROCESSES_SEO.title,
  description: MZHD_PROCESSES_SEO.description,
  path: PROCESSES_PATH,
  keywords: MZHD_PROCESSES_SEO.keywords,
});

const processesJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: PROCESSES_PATH,
    name: MZHD_PROCESSES_SEO.title,
    description: MZHD_PROCESSES_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Бизнес-процессы управления МЖД", path: PROCESSES_PATH },
  ]),
  faqPageJsonLd(PROCESSES_PATH, mzhdProcessesFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(PROCESSES_PATH)}/#defined-term`,
    name: "Бизнес-процессы управления МЖД",
    description: mzhdProcessesDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdProcessesRoutePage() {
  return (
    <>
      <JsonLd data={processesJsonLd} />
      <MzhdProcessesPage />
    </>
  );
}
