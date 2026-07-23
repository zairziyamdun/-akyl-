import type { Metadata } from "next";

import { SITE_URL } from "@/shared/config";

export const SITE_NAME = "AKYL";

export const SITE_DEFAULT_TITLE = "AKYL — система управления МЖД";

export const SITE_DEFAULT_DESCRIPTION =
  "Методология и платформа AKYL для профессионального управления многоквартирными жилыми домами: процессы, финансы, KPI и цифровые инструменты в единой системе.";

export const HOME_SEO = {
  title: "AKYL — профессиональное управление МЖД",
  description:
    "Методология и платформа, объединяющая процессы, финансы, участников, KPI и цифровые инструменты в единую систему управления многоквартирными жилыми домами.",
  keywords: [
    "AKYL",
    "управление МЖД",
    "многоквартирный дом",
    "ЖКХ",
    "ОСИ",
    "управляющая компания",
    "акимат",
    "методология управления",
    "индекс эффективности",
    "KPI МЖД",
  ],
} as const;

export const MZHD_SEO = {
  title: "Управление МЖД как профессиональная система | AKYL",
  description:
    "Методология AKYL для управления многоквартирным домом: архитектура, роли участников, бизнес-процессы, финансы, KPI, стандарты и индекс эффективности IEU.",
  keywords: [
    "управление МЖД",
    "методология управления МЖД",
    "система управления многоквартирным домом",
    "AKYL",
    "архитектура управления МЖД",
    "роли УК ОСИ",
    "бизнес-процессы МЖД",
    "финансы МЖД",
    "KPI управления домом",
    "индекс эффективности IEU",
    "стандарты управления ЖКХ",
  ],
} as const;

export const MZHD_THEORY_SEO = {
  title: "Теория управления МЖД | AKYL",
  description:
    "Научная база профессионального управления многоквартирными домами: системный подход, социотехника, кибернетика, цикл данных и связь теории с KPI и индексом IEU.",
  keywords: [
    "теория управления МЖД",
    "системный подход к управлению домом",
    "кибернетика ЖКХ",
    "социотехническая система МЖД",
    "обратная связь в управлении домом",
    "принципы управления МЖД",
    "KPI и IEU",
    "AKYL методология",
  ],
} as const;

export const MZHD_ARCHITECTURE_SEO = {
  title: "Архитектура системы управления МЖД | AKYL",
  description:
    "Архитектура управления многоквартирным домом: участники, процессы стратегии и операций, финансовый и цифровой контуры в единой модели AKYL.",
  keywords: [
    "архитектура управления МЖД",
    "система управления многоквартирным домом",
    "участники управления МЖД",
    "финансовый контур МЖД",
    "цифровой контур управления домом",
    "стратегия и операции МЖД",
    "модель управления ЖКХ",
    "AKYL архитектура",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function organizationId(): string {
  return `${SITE_URL}/#organization`;
}

export function websiteId(): string {
  return `${SITE_URL}/#website`;
}

export function webpageId(path: string): string {
  return `${absoluteUrl(path)}/#webpage`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "ru_KZ",
      url,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const siteOpenGraph: Metadata["openGraph"] = {
  type: "website",
  locale: "ru_KZ",
  siteName: SITE_NAME,
  url: SITE_URL,
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
};

export const siteTwitter: Metadata["twitter"] = {
  card: "summary_large_image",
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
};
