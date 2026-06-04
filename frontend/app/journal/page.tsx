import type { Metadata } from "next";

import { JournalPage } from "@/components/sections/journal/JournalPage";

export const metadata: Metadata = {
  title: "Журнал | AKYL",
  description:
    "Экспертные статьи, аналитика и публикации о профессиональном управлении МЖД.",
};

export default function JournalRoutePage() {
  return <JournalPage />;
}
