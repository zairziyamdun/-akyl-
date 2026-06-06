import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import {
  createJournalIssue,
  deleteJournalIssue,
  getJournalIssueById,
  listJournalIssues,
  transitionJournalIssue,
  updateJournalIssue,
  assertIssueOwnerOrAdmin,
  assertAuthenticated,
} from "./journal.service.js";
import type {
  CreateJournalIssueBody,
  UpdateJournalIssueBody,
} from "./journal.schema.js";

export const listIssuesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const issues = await listJournalIssues(req.profile?.role);

    sendSuccess(res, 200, { data: issues });
  },
);

export const getIssueHandler = asyncHandler(async (req: Request, res: Response) => {
  const issue = await getJournalIssueById(req.params.id!, req.profile?.role);

  sendSuccess(res, 200, { data: issue });
});

export const createIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    assertAuthenticated(req.user?.id);

    const issue = await createJournalIssue(
      req.body as CreateJournalIssueBody,
      req.user.id,
    );

    sendSuccess(res, 201, { message: "Issue created", data: issue });
  },
);

export const updateIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    assertAuthenticated(req.user?.id);

    const existing = await getJournalIssueById(req.params.id!, req.profile!.role);
    assertIssueOwnerOrAdmin(existing, req.user!.id, req.profile!.role);

    const issue = await updateJournalIssue(
      req.params.id!,
      req.body as UpdateJournalIssueBody,
      req.profile!.role,
    );

    sendSuccess(res, 200, { message: "Issue updated", data: issue });
  },
);

export const deleteIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteJournalIssue(req.params.id!);
    sendSuccess(res, 200, { message: "Issue deleted" });
  },
);

export const submitIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    assertAuthenticated(req.user?.id);

    const existing = await getJournalIssueById(req.params.id!, req.profile!.role);
    assertIssueOwnerOrAdmin(existing, req.user!.id, req.profile!.role);

    const issue = await transitionJournalIssue(
      req.params.id!,
      "review",
      req.profile!.role,
    );

    sendSuccess(res, 200, { message: "Issue submitted for review", data: issue });
  },
);

export const publishIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const issue = await transitionJournalIssue(
      req.params.id!,
      "published",
      req.profile!.role,
    );

    sendSuccess(res, 200, { message: "Issue published", data: issue });
  },
);

export const archiveIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const issue = await transitionJournalIssue(
      req.params.id!,
      "archived",
      req.profile!.role,
    );

    sendSuccess(res, 200, { message: "Issue archived", data: issue });
  },
);

export const revisionIssueHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const issue = await transitionJournalIssue(
      req.params.id!,
      "draft",
      req.profile!.role,
    );

    sendSuccess(res, 200, { message: "Issue sent back for revision", data: issue });
  },
);

// TODO: POST /api/journal/upload/cover — Supabase Storage journal-covers
// TODO: POST /api/journal/upload/pdf — Supabase Storage journal-pdfs
