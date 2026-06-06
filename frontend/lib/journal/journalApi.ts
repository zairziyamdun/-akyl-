/**
 * Точки подключения API / Supabase (будущая интеграция).
 *
 * Supabase Database:
 *   - таблица `journal_issues` (поля из JournalIssueRecord)
 *
 * Supabase Storage:
 *   - bucket `journal-covers` — обложки
 *   - bucket `journal-pdfs` — PDF выпусков
 *
 * REST API (пример):
 *   GET    /api/journal/issues
 *   GET    /api/journal/issues/:id
 *   POST   /api/journal/issues
 *   PATCH  /api/journal/issues/:id
 *   DELETE /api/journal/issues/:id
 *   POST   /api/journal/issues/:id/submit
 *   POST   /api/journal/issues/:id/approve
 *   POST   /api/journal/issues/:id/reject
 *   POST   /api/journal/issues/:id/revision
 *   POST   /api/journal/issues/:id/archive
 *   POST   /api/journal/upload/cover
 *   POST   /api/journal/upload/pdf
 */

export const JOURNAL_API = {
  issues: "/api/journal/issues",
  issue: (id: string) => `/api/journal/issues/${id}`,
  submit: (id: string) => `/api/journal/issues/${id}/submit`,
  approve: (id: string) => `/api/journal/issues/${id}/approve`,
  reject: (id: string) => `/api/journal/issues/${id}/reject`,
  revision: (id: string) => `/api/journal/issues/${id}/revision`,
  archive: (id: string) => `/api/journal/issues/${id}/archive`,
  uploadCover: "/api/journal/upload/cover",
  uploadPdf: "/api/journal/upload/pdf",
} as const;

export const JOURNAL_STORAGE = {
  coversBucket: "journal-covers",
  pdfsBucket: "journal-pdfs",
} as const;
