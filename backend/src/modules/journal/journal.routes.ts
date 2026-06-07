import { Router } from "express";

import {
  authMiddleware,
  optionalAuthMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  archiveIssueHandler,
  createIssueHandler,
  deleteIssueHandler,
  getIssueHandler,
  getIssuePdfFileHandler,
  getIssuePdfHandler,
  listIssuesHandler,
  publishIssueHandler,
  revisionIssueHandler,
  submitIssueHandler,
  updateIssueHandler,
  uploadCoverHandler,
  uploadPdfHandler,
} from "./journal.controller.js";
import { createJournalIssueSchema, updateJournalIssueSchema } from "./journal.schema.js";
import {
  uploadCoverMiddleware,
  uploadPdfMiddleware,
} from "./journal.upload.middleware.js";

const router = Router();

const editorRoles = ["journalist", "admin"] as const;
const adminOnly = ["admin"] as const;

router.post(
  "/upload-cover",
  authMiddleware,
  roleMiddleware([...editorRoles]),
  uploadCoverMiddleware,
  uploadCoverHandler,
);

router.post(
  "/upload-pdf",
  authMiddleware,
  roleMiddleware([...editorRoles]),
  uploadPdfMiddleware,
  uploadPdfHandler,
);

router.get("/issues", optionalAuthMiddleware, listIssuesHandler);
router.get("/issues/:id/pdf/file", optionalAuthMiddleware, getIssuePdfFileHandler);
router.get("/issues/:id/pdf", optionalAuthMiddleware, getIssuePdfHandler);
router.get("/issues/:id", optionalAuthMiddleware, getIssueHandler);

router.post(
  "/issues",
  authMiddleware,
  roleMiddleware([...editorRoles]),
  validateBody(createJournalIssueSchema),
  createIssueHandler,
);

router.patch(
  "/issues/:id",
  authMiddleware,
  roleMiddleware([...editorRoles]),
  validateBody(updateJournalIssueSchema),
  updateIssueHandler,
);

router.delete(
  "/issues/:id",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  deleteIssueHandler,
);

router.post(
  "/issues/:id/submit",
  authMiddleware,
  roleMiddleware([...editorRoles]),
  submitIssueHandler,
);

router.post(
  "/issues/:id/publish",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  publishIssueHandler,
);

router.post(
  "/issues/:id/archive",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  archiveIssueHandler,
);

router.post(
  "/issues/:id/revision",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  revisionIssueHandler,
);

export default router;
