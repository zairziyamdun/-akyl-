import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import {
  createJournalIssue,
  deleteJournalIssue,
  getIssuePdfSignedUrl,
  getJournalIssueById,
  listJournalIssues,
  transitionJournalIssue,
  updateJournalIssue,
  assertIssueOwnerOrAdmin,
  assertAuthenticated,
} from "./journal.service.js";
import {
  assertCoverFile,
  assertPdfFile,
  uploadCoverToStorage,
  uploadPdfToStorage,
} from "./journal.storage.js";
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

export const getIssuePdfHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const url = await getIssuePdfSignedUrl(req.params.id!, req.profile?.role);

    res.status(200).json({ success: true, url });
  },
);

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

export const uploadCoverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const file = assertCoverFile(req.file);
    const result = await uploadCoverToStorage(file);

    res.status(200).json({
      success: true,
      url: result.url,
      path: result.path,
    });
  },
);

export const uploadPdfHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const file = assertPdfFile(req.file);
    const result = await uploadPdfToStorage(file);

    res.status(200).json({
      success: true,
      path: result.path,
      fileName: result.fileName,
      size: result.size,
    });
  },
);
