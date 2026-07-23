import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config";

const PUBLIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/mzhd", changeFrequency: "monthly", priority: 0.9 },
  { path: "/mzhd/theory", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/architecture", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/processes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/finance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/kpi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/standards", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mzhd/roles", changeFrequency: "monthly", priority: 0.8 },
  { path: "/implementation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/education", changeFrequency: "monthly", priority: 0.8 },
  { path: "/akimat", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consultation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/library", changeFrequency: "weekly", priority: 0.7 },
  { path: "/library/books", changeFrequency: "weekly", priority: 0.6 },
  { path: "/journal", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/index-efficiency", changeFrequency: "monthly", priority: 0.7 },
  { path: "/tools/budget-analysis", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/tools/management-report",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/tools/kpi-templates", changeFrequency: "monthly", priority: 0.7 },
  { path: "/tools/checklists", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
