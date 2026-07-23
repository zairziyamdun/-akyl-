import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  IMPLEMENTATION_SEO,
  JsonLd,
  jsonLdGraph,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  ImplementationPage,
  implementationDefinition,
  implementationFaq,
} from "@/widgets/implementation-page";

const IMPLEMENTATION_PATH = "/implementation";

export const metadata = createPageMetadata({
  title: IMPLEMENTATION_SEO.title,
  description: IMPLEMENTATION_SEO.description,
  path: IMPLEMENTATION_PATH,
  keywords: IMPLEMENTATION_SEO.keywords,
});

const implementationJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: IMPLEMENTATION_PATH,
    name: IMPLEMENTATION_SEO.title,
    description: IMPLEMENTATION_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Практика внедрения", path: IMPLEMENTATION_PATH },
  ]),
  faqPageJsonLd(IMPLEMENTATION_PATH, implementationFaq),
  {
    "@type": "HowTo",
    "@id": `${absoluteUrl(IMPLEMENTATION_PATH)}/#howto`,
    name: "Внедрение системы профессионального управления МЖД",
    description: implementationDefinition,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Диагностика дома",
        text: "Анализ технического состояния, финансов, заявок, документов и коммуникаций.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Аудит управления",
        text: "Выявление слабых мест, рисков, потерь и разрывов в процессах.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Проектирование системы",
        text: "Настройка ролей, процессов, регламентов, отчётности и KPI.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Внедрение инструментов",
        text: "Запуск чек-листов, бюджетного анализа, управленческого отчёта и индекса эффективности.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Обучение участников",
        text: "Подготовка УК, ОСИ, совета дома и ответственных специалистов.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Контроль и развитие",
        text: "Регулярный мониторинг, корректировка процессов и повышение индекса управления.",
      },
    ],
  },
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(IMPLEMENTATION_PATH)}/#defined-term`,
    name: "Практика внедрения AKYL",
    description: implementationDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function ImplementationRoutePage() {
  return (
    <>
      <JsonLd data={implementationJsonLd} />
      <ImplementationPage />
    </>
  );
}
