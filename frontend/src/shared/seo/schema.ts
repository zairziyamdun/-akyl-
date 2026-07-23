import {
  absoluteUrl,
  HOME_SEO,
  organizationId,
  SITE_NAME,
  websiteId,
} from "./site";

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon"),
    description: HOME_SEO.description,
    sameAs: ["https://akyl.kz/"],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: HOME_SEO.description,
    inLanguage: "ru-KZ",
    publisher: {
      "@id": organizationId(),
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items.at(-1)?.path ?? "/")}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

export function faqPageJsonLd(
  path: string,
  items: ReadonlyArray<FaqItem>,
) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type WebPageJsonLdInput = {
  path: string;
  name: string;
  description: string;
  dateModified?: string;
  speakableCssSelectors?: readonly string[];
};

export function webPageJsonLd({
  path,
  name,
  description,
  dateModified,
  speakableCssSelectors = ["[data-geo-definition]", "[data-geo-faq]"],
}: WebPageJsonLdInput) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}/#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "ru-KZ",
    isPartOf: {
      "@id": websiteId(),
    },
    about: {
      "@id": organizationId(),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(`${path === "/" ? "" : path}/opengraph-image`),
    },
    ...(dateModified
      ? {
          dateModified,
        }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [...speakableCssSelectors],
    },
  };
}

export function jsonLdGraph(
  nodes: ReadonlyArray<Record<string, unknown>>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
