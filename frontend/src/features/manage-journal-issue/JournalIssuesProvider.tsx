"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/features/auth";
import {
  fromApiIssue,
  toApiCreatePayload,
  toApiUpdatePayload,
  archiveJournalIssueApi,
  createJournalIssueApi,
  deleteJournalIssueApi,
  fetchIssuePdfUrl,
  fetchJournalIssue,
  fetchJournalIssues,
  publishJournalIssueApi,
  revisionJournalIssueApi,
  submitJournalIssueApi,
  updateJournalIssueApi,
  uploadCoverApi,
  uploadPdfApi,
  type CreateJournalIssuePayload,
  type JournalIssueFilter,
  type JournalIssueRecord,
} from "@/entities/journal-issue";

type JournalIssuesContextValue = {
  issues: JournalIssueRecord[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getIssue: (id: string) => JournalIssueRecord | undefined;
  fetchIssue: (id: string) => Promise<JournalIssueRecord | null>;
  getPublishedIssues: () => JournalIssueRecord[];
  filterIssues: (filter: JournalIssueFilter) => JournalIssueRecord[];
  createIssue: (payload: CreateJournalIssuePayload, asDraft?: boolean) => Promise<string>;
  updateIssue: (id: string, payload: Partial<JournalIssueRecord>) => Promise<void>;
  submitForReview: (id: string) => Promise<void>;
  approveIssue: (id: string) => Promise<void>;
  requestRevision: (id: string) => Promise<void>;
  archiveIssue: (id: string) => Promise<void>;
  publishIssue: (id: string) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
  uploadCover: (file: File) => Promise<{ url: string; path: string }>;
  uploadPdf: (file: File) => Promise<{ path: string; fileName: string; size: number }>;
  openIssuePdf: (id: string) => Promise<void>;
};

const JournalIssuesContext = createContext<JournalIssuesContextValue | null>(null);

function upsertIssue(
  list: JournalIssueRecord[],
  issue: JournalIssueRecord,
): JournalIssueRecord[] {
  const idx = list.findIndex((i) => i.id === issue.id);
  if (idx === -1) return [issue, ...list];
  const next = [...list];
  next[idx] = issue;
  return next;
}

export function JournalIssuesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [issues, setIssues] = useState<JournalIssueRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchJournalIssues();
      setIssues(data.map(fromApiIssue));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить выпуски");
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, isAuthenticated, refresh]);

  const getIssue = useCallback(
    (id: string) => issues.find((i) => i.id === id),
    [issues],
  );

  const fetchIssue = useCallback(
    async (id: string) => {
      try {
        const data = await fetchJournalIssue(id);
        const record = fromApiIssue(data);
        setIssues((prev) => upsertIssue(prev, record));
        return record;
      } catch {
        return null;
      }
    },
    [],
  );

  const getPublishedIssues = useCallback(
    () =>
      issues
        .filter((i) => i.status === "PUBLISHED")
        .sort((a, b) => b.issueNumber.localeCompare(a.issueNumber)),
    [issues],
  );

  const filterIssues = useCallback(
    (filter: JournalIssueFilter) => {
      if (filter === "ALL") return [...issues];
      return issues.filter((i) => i.status === filter);
    },
    [issues],
  );

  const createIssue = useCallback(
    async (payload: CreateJournalIssuePayload, asDraft = true) => {
      const created = await createJournalIssueApi(toApiCreatePayload(payload));
      let record = fromApiIssue(created);

      if (payload.pdfFileName) {
        record = {
          ...record,
          pdfFileName: payload.pdfFileName,
          pdfSizeBytes: payload.pdfSizeBytes ?? record.pdfSizeBytes,
        };
      }

      if (!asDraft) {
        const submitted = await submitJournalIssueApi(record.id);
        record = fromApiIssue(submitted);
        if (payload.pdfFileName) {
          record = {
            ...record,
            pdfFileName: payload.pdfFileName,
            pdfSizeBytes: payload.pdfSizeBytes ?? record.pdfSizeBytes,
          };
        }
      }

      setIssues((prev) => upsertIssue(prev, record));
      return record.id;
    },
    [],
  );

  const updateIssue = useCallback(
    async (id: string, payload: Partial<JournalIssueRecord>) => {
      const updated = await updateJournalIssueApi(id, toApiUpdatePayload(payload));
      let record = fromApiIssue(updated);
      if (payload.pdfFileName) {
        record = {
          ...record,
          pdfFileName: payload.pdfFileName,
          pdfSizeBytes: payload.pdfSizeBytes ?? record.pdfSizeBytes,
        };
      }
      setIssues((prev) => upsertIssue(prev, record));
    },
    [],
  );

  const submitForReview = useCallback(async (id: string) => {
    const updated = await submitJournalIssueApi(id);
    setIssues((prev) => upsertIssue(prev, fromApiIssue(updated)));
  }, []);

  const approveIssue = useCallback(async (id: string) => {
    const updated = await publishJournalIssueApi(id);
    setIssues((prev) => upsertIssue(prev, fromApiIssue(updated)));
  }, []);

  const publishIssue = approveIssue;

  const requestRevision = useCallback(async (id: string) => {
    const updated = await revisionJournalIssueApi(id);
    setIssues((prev) => upsertIssue(prev, fromApiIssue(updated)));
  }, []);

  const archiveIssue = useCallback(async (id: string) => {
    const updated = await archiveJournalIssueApi(id);
    setIssues((prev) => upsertIssue(prev, fromApiIssue(updated)));
  }, []);

  const deleteIssue = useCallback(async (id: string) => {
    await deleteJournalIssueApi(id);
    setIssues((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const uploadCover = useCallback(async (file: File) => {
    const result = await uploadCoverApi(file);
    return { url: result.url, path: result.path };
  }, []);

  const uploadPdf = useCallback(async (file: File) => {
    const result = await uploadPdfApi(file);
    return {
      path: result.path,
      fileName: result.fileName,
      size: result.size,
    };
  }, []);

  const openIssuePdf = useCallback(async (id: string) => {
    const url = await fetchIssuePdfUrl(id);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }, []);

  const value = useMemo(
    () => ({
      issues,
      isLoading,
      error,
      refresh,
      getIssue,
      fetchIssue,
      getPublishedIssues,
      filterIssues,
      createIssue,
      updateIssue,
      submitForReview,
      approveIssue,
      requestRevision,
      archiveIssue,
      publishIssue,
      deleteIssue,
      uploadCover,
      uploadPdf,
      openIssuePdf,
    }),
    [
      issues,
      isLoading,
      error,
      refresh,
      getIssue,
      fetchIssue,
      getPublishedIssues,
      filterIssues,
      createIssue,
      updateIssue,
      submitForReview,
      approveIssue,
      requestRevision,
      archiveIssue,
      publishIssue,
      deleteIssue,
      uploadCover,
      uploadPdf,
      openIssuePdf,
    ],
  );

  return (
    <JournalIssuesContext.Provider value={value}>
      {children}
    </JournalIssuesContext.Provider>
  );
}

export function useJournalIssues() {
  const ctx = useContext(JournalIssuesContext);
  if (!ctx) {
    throw new Error("useJournalIssues must be used within JournalIssuesProvider");
  }
  return ctx;
}

export { JournalApiError } from "@/entities/journal-issue";
