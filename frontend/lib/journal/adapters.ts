import type { JournalIssue } from "@/data/journalData";
import type { JournalIssueRecord } from "@/lib/journal/types";

/** Адаптер CMS-записи → публичный тип для hero/slider */
export function toPublicJournalIssue(record: JournalIssueRecord): JournalIssue {
  const year = record.createdAt
    ? new Date(record.createdAt).getFullYear().toString()
    : "2026";

  return {
    id: record.id,
    title: record.title,
    subtitle: record.description.slice(0, 60) + (record.description.length > 60 ? "…" : ""),
    description: record.description,
    issue: record.issueNumber,
    year,
    category: accessToCategory(record.accessType),
    coverImage: record.coverUrl,
    backgroundImage: record.coverUrl,
    pdfUrl: record.pdfUrl,
    isLocked: record.accessType !== "FREE",
  };
}

function accessToCategory(access: JournalIssueRecord["accessType"]): string {
  switch (access) {
    case "FREE":
      return "Открытый выпуск";
    case "PAID":
      return "По подписке";
    case "PRIVATE":
      return "Закрытый выпуск";
  }
}
