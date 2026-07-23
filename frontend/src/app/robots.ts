import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/app",
          "/app/",
          "/studio",
          "/studio/",
          "/manager",
          "/manager/",
          "/login",
          "/register",
          "/forgot-password",
          "/403",
          "/test-akyl-dashboard",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
