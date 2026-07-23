import type { Metadata } from "next";

import { absoluteUrl, HOME_SEO, JsonLd, SITE_NAME } from "@/shared/seo";
import {
  HeroSection,
  HomeAnalyticsShowcaseSection,
  HomeAudienceSection,
  HomeClosingCtaSection,
  HomeEducationSpotlightSection,
  HomeImplementationPracticeSection,
  HomeJournalSpotlightSection,
  HomeKnowledgeLibrarySection,
  HomePlatformDirectionsSection,
  HomeProfessionalManagementSection,
  HomeSystemViewSection,
  HomeUrbanCaseSection,
  HomeWhyNewSystemSection,
} from "@/widgets/home-page";

export const metadata: Metadata = {
  title: { absolute: HOME_SEO.title },
  description: HOME_SEO.description,
  keywords: [...HOME_SEO.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}/#organization`,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon"),
      description: HOME_SEO.description,
      sameAs: ["https://akyl.kz/"],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}/#website`,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      description: HOME_SEO.description,
      inLanguage: "ru-KZ",
      publisher: {
        "@id": `${absoluteUrl("/")}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/")}/#webpage`,
      url: absoluteUrl("/"),
      name: HOME_SEO.title,
      description: HOME_SEO.description,
      inLanguage: "ru-KZ",
      isPartOf: {
        "@id": `${absoluteUrl("/")}/#website`,
      },
      about: {
        "@id": `${absoluteUrl("/")}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="min-w-0 overflow-x-hidden bg-white">
      <JsonLd data={homeJsonLd} />
      <HeroSection />
      <HomeWhyNewSystemSection />
      <HomeProfessionalManagementSection />
      <HomeSystemViewSection />
      <HomePlatformDirectionsSection />
      <HomeImplementationPracticeSection />
      <HomeUrbanCaseSection />
      <HomeAudienceSection />
      <HomeAnalyticsShowcaseSection />
      <HomeEducationSpotlightSection />
      <HomeKnowledgeLibrarySection />
      <HomeJournalSpotlightSection />
      <HomeClosingCtaSection />
    </main>
  );
}
