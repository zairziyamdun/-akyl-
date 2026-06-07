import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { ValidationError } from "../../common/errors.js";
import { logInfo } from "../../common/logger.js";
import { sendSuccess } from "../../common/response.js";
import {
  createJournalIssue,
  deleteJournalIssue,
  getIssuePdfFile,
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
  createSignedPdfUploadUrl,
  uploadCoverToStorage,
  uploadPdfToStorage,
} from "./journal.storage.js";
import { VERCEL_SERVERLESS_BODY_LIMIT_BYTES } from "./journal.upload.constants.js";
import type {
  CreateJournalIssueBody,
  InitPdfUploadBody,
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

export const getIssuePdfFileHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const issueId = req.params.id!;
    const started = Date.now();

    const { buffer, fileName } = await getIssuePdfFile(
      issueId,
      req.profile?.role,
    );

    const asDownload = req.query.download === "1";
    const safeName = fileName.replace(/[^\w.\-() ]+/g, "_") || "issue.pdf";

    logInfo("journal.pdf.file", {
      issueId,
      download: asDownload,
      bytes: buffer.length,
      contentType: "application/pdf",
      durationMs: Date.now() - started,
      userAgent: req.get("user-agent")?.slice(0, 120),
      origin: req.get("origin"),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", String(buffer.length));
    res.setHeader(
      "Content-Disposition",
      asDownload
        ? `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(safeName)}`
        : "inline",
    );
    res.setHeader("Cache-Control", "private, no-store");

    res.status(200).send(buffer);
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

export const initPdfUploadHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as InitPdfUploadBody;

    if (body.contentType !== "application/pdf") {
      throw new ValidationError("Only PDF files are allowed");
    }

    const result = await createSignedPdfUploadUrl(body.fileName, body.fileSize);

    logInfo("journal.pdf.upload-init", {
      path: result.path,
      fileName: result.fileName,
      fileSize: body.fileSize,
      bucket: result.bucket,
    });

    res.status(200).json({
      success: true,
      path: result.path,
      fileName: result.fileName,
      signedUrl: result.signedUrl,
      token: result.token,
      bucket: result.bucket,
      maxBytes: result.maxBytes,
      serverlessLimitBytes: VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
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
