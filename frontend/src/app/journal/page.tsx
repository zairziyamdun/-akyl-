import type { Metadata } from "next";

import { JournalPage } from "@/widgets/journal-marketing";

export const metadata: Metadata = {
  title: "Журнал | AKYL",
  description:
    "Экспертные статьи, аналитика и публикации о профессиональном управлении МЖД.",
};

export default function JournalRoutePage() {
  return <JournalPage />;
}
