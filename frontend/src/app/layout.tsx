import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/features/auth";
import { JournalIssuesProvider } from "@/features/manage-journal-issue";
import { SITE_URL } from "@/shared/config";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  siteOpenGraph,
  siteTwitter,
} from "@/shared/seo";
import { AppChrome } from "@/widgets/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: siteOpenGraph,
  twitter: siteTwitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <AuthProvider>
          <JournalIssuesProvider>
            <AppChrome>{children}</AppChrome>
          </JournalIssuesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
