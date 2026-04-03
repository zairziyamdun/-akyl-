import type { Metadata } from "next";

import { AuthorAboutSection } from "@/components/sections/author/AuthorAboutSection";
import { AuthorAkylSection } from "@/components/sections/author/AuthorAkylSection";
import { AuthorBooksSection } from "@/components/sections/author/AuthorBooksSection";
import { AuthorCtaSection } from "@/components/sections/author/AuthorCtaSection";
import { AuthorExpertiseSection } from "@/components/sections/author/AuthorExpertiseSection";
import { AuthorHeroSection } from "@/components/sections/author/AuthorHeroSection";
import { AuthorMethodologySection } from "@/components/sections/author/AuthorMethodologySection";
import { AuthorResultsSection } from "@/components/sections/author/AuthorResultsSection";

export const metadata: Metadata = {
  title: "Шеризат Джарболов — автор методологии AKYL",
  description:
    "Шеризат Джарболов — источник методологии профессионального управления МЖД: экспертиза, система AKYL, книги и форматы работы с автором.",
};

export default function AuthorPage() {
  return (
    <div className="bg-[#060a0f] text-slate-100 antialiased">
      <AuthorHeroSection />
      <AuthorAboutSection />
      <AuthorExpertiseSection />
      <AuthorMethodologySection />
      <AuthorBooksSection />
      <AuthorAkylSection />
      <AuthorResultsSection />
      <AuthorCtaSection />
    </div>
  );
}
