"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { initialJournalIssues } from "@/data/journalIssuesMock";
import { mockAuth } from "@/lib/auth/mockAuth";

import type {
  CreateJournalIssuePayload,
  JournalIssueFilter,
  JournalIssueRecord,
  JournalIssueStatus,
} from "./types";
import { generateIssueId } from "./utils";

type JournalIssuesContextValue = {
  issues: JournalIssueRecord[];
  isLoading: boolean;
  getIssue: (id: string) => JournalIssueRecord | undefined;
  getPublishedIssues: () => JournalIssueRecord[];
  filterIssues: (filter: JournalIssueFilter) => JournalIssueRecord[];
  createIssue: (payload: CreateJournalIssuePayload, asDraft?: boolean) => string;
  updateIssue: (id: string, payload: Partial<JournalIssueRecord>) => void;
  submitForReview: (id: string) => void;
  approveIssue: (id: string) => void;
  rejectIssue: (id: string, note?: string) => void;
  requestRevision: (id: string, note?: string) => void;
  archiveIssue: (id: string) => void;
  publishIssue: (id: string) => void;
  deleteIssue: (id: string) => void;
};

const JournalIssuesContext = createContext<JournalIssuesContextValue | null>(null);

function nowIso() {
  return new Date().toISOString();
}

export function JournalIssuesProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<JournalIssueRecord[]>(initialJournalIssues);
  const [isLoading] = useState(false);

  const getIssue = useCallback(
    (id: string) => issues.find((i) => i.id === id),
    [issues],
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

  const patchIssue = useCallback(
    (id: string, patch: Partial<JournalIssueRecord>) => {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === id
            ? { ...issue, ...patch, updatedAt: nowIso() }
            : issue,
        ),
      );
    },
    [],
  );

  const createIssue = useCallback(
    (payload: CreateJournalIssuePayload, asDraft = true) => {
      const id = generateIssueId();
      const timestamp = nowIso();
      const record: JournalIssueRecord = {
        id,
        title: payload.title,
        issueNumber: payload.issueNumber,
        description: payload.description,
        coverUrl: payload.coverUrl ?? "",
        coverFileName: payload.coverFileName,
        pdfUrl: payload.pdfUrl ?? "",
        pdfFileName: payload.pdfFileName ?? "",
        pdfSizeBytes: payload.pdfSizeBytes ?? 0,
        accessType: payload.accessType,
        status: asDraft ? "DRAFT" : "REVIEW",
        authorId: mockAuth.user.id,
        authorName: mockAuth.user.name,
        createdAt: timestamp,
        updatedAt: timestamp,
        pdfUploadedAt: payload.pdfUrl ? timestamp : "",
      };
      setIssues((prev) => [record, ...prev]);
      return id;
    },
    [],
  );

  const updateIssue = useCallback(
    (id: string, payload: Partial<JournalIssueRecord>) => {
      patchIssue(id, payload);
    },
    [patchIssue],
  );

  const submitForReview = useCallback(
    (id: string) => patchIssue(id, { status: "REVIEW", rejectionNote: undefined }),
    [patchIssue],
  );

  const setStatus = useCallback(
    (id: string, status: JournalIssueStatus, rejectionNote?: string) => {
      patchIssue(id, { status, rejectionNote });
    },
    [patchIssue],
  );

  const approveIssue = useCallback(
    (id: string) => setStatus(id, "PUBLISHED", undefined),
    [setStatus],
  );

  const rejectIssue = useCallback(
    (id: string, note?: string) =>
      setStatus(id, "ARCHIVED", note ?? "Выпуск отклонён администратором"),
    [setStatus],
  );

  const requestRevision = useCallback(
    (id: string, note?: string) =>
      setStatus(id, "DRAFT", note ?? "Требуется доработка"),
    [setStatus],
  );

  const archiveIssue = useCallback(
    (id: string) => setStatus(id, "ARCHIVED"),
    [setStatus],
  );

  const publishIssue = useCallback(
    (id: string) => setStatus(id, "PUBLISHED"),
    [setStatus],
  );

  const deleteIssue = useCallback((id: string) => {
    setIssues((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      issues,
      isLoading,
      getIssue,
      getPublishedIssues,
      filterIssues,
      createIssue,
      updateIssue,
      submitForReview,
      approveIssue,
      rejectIssue,
      requestRevision,
      archiveIssue,
      publishIssue,
      deleteIssue,
    }),
    [
      issues,
      isLoading,
      getIssue,
      getPublishedIssues,
      filterIssues,
      createIssue,
      updateIssue,
      submitForReview,
      approveIssue,
      rejectIssue,
      requestRevision,
      archiveIssue,
      publishIssue,
      deleteIssue,
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
