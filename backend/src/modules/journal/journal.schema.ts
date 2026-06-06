import { z } from "zod";

export const journalAccessTypeSchema = z.enum(["free", "paid", "private"]);
export const journalStatusSchema = z.enum(["draft", "review", "published", "archived"]);

export const createJournalIssueSchema = z.object({
  title: z.string().min(1),
  issue_number: z.string().min(1),
  description: z.string().min(1),
  cover_url: z.string().optional(),
  pdf_url: z.string().optional(),
  access_type: journalAccessTypeSchema,
});

export const updateJournalIssueSchema = createJournalIssueSchema.partial();

export type CreateJournalIssueBody = z.infer<typeof createJournalIssueSchema>;
export type UpdateJournalIssueBody = z.infer<typeof updateJournalIssueSchema>;
