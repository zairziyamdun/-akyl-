import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config";

const PRIVATE_PATHS = [
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
] as const;

/** Allow major AI / answer-engine crawlers for GEO while keeping private areas closed. */
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS],
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt"],
        disallow: [...PRIVATE_PATHS],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
