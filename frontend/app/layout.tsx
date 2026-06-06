import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import { AppChrome } from "@/components/layout/AppChrome";
import { MockAuthProvider } from "@/lib/auth/MockAuthProvider";
import { JournalIssuesProvider } from "@/lib/journal/JournalIssuesProvider";

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
  title: "AKYL - система управления МЖД",
  description: "AKYL - это платформа для системного управления МЖД",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <MockAuthProvider>
          <JournalIssuesProvider>
            <AppChrome>{children}</AppChrome>
          </JournalIssuesProvider>
        </MockAuthProvider>
      </body>
    </html>
  );
}
