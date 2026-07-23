import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_THEORY_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdTheoryPage,
  mzhdTheoryDefinition,
  mzhdTheoryFaq,
} from "@/widgets/mzhd-page";

const THEORY_PATH = "/mzhd/theory";

export const metadata = createPageMetadata({
  title: MZHD_THEORY_SEO.title,
  description: MZHD_THEORY_SEO.description,
  path: THEORY_PATH,
  keywords: MZHD_THEORY_SEO.keywords,
});

const theoryJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: THEORY_PATH,
    name: MZHD_THEORY_SEO.title,
    description: MZHD_THEORY_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Теория управления МЖД", path: THEORY_PATH },
  ]),
  faqPageJsonLd(
    THEORY_PATH,
    mzhdTheoryFaq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  ),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(THEORY_PATH)}/#defined-term`,
    name: "Теория управления МЖД",
    description: mzhdTheoryDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdTheoryRoutePage() {
  return (
    <>
      <JsonLd data={theoryJsonLd} />
      <MzhdTheoryPage />
    </>
  );
}
