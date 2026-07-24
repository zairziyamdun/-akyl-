import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdArchitecturePreviewSection,
  MzhdAudienceSection,
  MzhdCtaSection,
  MzhdDefinitionSection,
  MzhdFaqSection,
  MzhdHeroSection,
  MzhdIeuSection,
  MzhdMethodologySection,
  MzhdProblemsSection,
  MzhdSystemSection,
  mzhdDefinition,
  mzhdFaqItems,
} from "@/widgets/mzhd-page";

const MZHD_PATH = "/mzhd";

export const metadata = createPageMetadata({
  title: MZHD_SEO.title,
  description: MZHD_SEO.description,
  path: MZHD_PATH,
  keywords: MZHD_SEO.keywords,
});

const mzhdJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: MZHD_PATH,
    name: MZHD_SEO.title,
    description: MZHD_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: MZHD_PATH },
  ]),
  faqPageJsonLd(MZHD_PATH, mzhdFaqItems),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(MZHD_PATH)}/#defined-term`,
    name: "Управление МЖД по методологии AKYL",
    description: mzhdDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl(MZHD_PATH),
    },
  },
]);

export default function MzhdPage() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-slate-900">
      <JsonLd data={mzhdJsonLd} />
      <MzhdHeroSection />
      <MzhdDefinitionSection />
      <MzhdProblemsSection />
      <MzhdSystemSection />
      <MzhdMethodologySection />
      <MzhdArchitecturePreviewSection />
      <MzhdIeuSection />
      <MzhdAudienceSection />
      <MzhdFaqSection />
      <MzhdCtaSection />
    </main>
  );
}
