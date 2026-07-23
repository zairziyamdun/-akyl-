import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  JsonLd,
  jsonLdGraph,
  MZHD_ROLES_SEO,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/shared/seo";
import {
  MzhdRolesPage,
  mzhdRolesDefinition,
  mzhdRolesFaq,
} from "@/widgets/mzhd-page";

const ROLES_PATH = "/mzhd/roles";

export const metadata = createPageMetadata({
  title: MZHD_ROLES_SEO.title,
  description: MZHD_ROLES_SEO.description,
  path: ROLES_PATH,
  keywords: MZHD_ROLES_SEO.keywords,
});

const rolesJsonLd = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  webPageJsonLd({
    path: ROLES_PATH,
    name: MZHD_ROLES_SEO.title,
    description: MZHD_ROLES_SEO.description,
    dateModified: "2026-07-23",
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Управление МЖД", path: "/mzhd" },
    { name: "Роли участников управления", path: ROLES_PATH },
  ]),
  faqPageJsonLd(ROLES_PATH, mzhdRolesFaq),
  {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(ROLES_PATH)}/#defined-term`,
    name: "Роли участников управления МЖД",
    description: mzhdRolesDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Методология AKYL",
      url: absoluteUrl("/mzhd"),
    },
  },
]);

export default function MzhdRolesRoutePage() {
  return (
    <>
      <JsonLd data={rolesJsonLd} />
      <MzhdRolesPage />
    </>
  );
}
