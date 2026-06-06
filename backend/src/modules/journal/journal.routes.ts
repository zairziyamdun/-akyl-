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
  listIssuesHandler,
  publishIssueHandler,
  revisionIssueHandler,
  submitIssueHandler,
  updateIssueHandler,
} from "./journal.controller.js";
import { createJournalIssueSchema, updateJournalIssueSchema } from "./journal.schema.js";

const router = Router();

const editorRoles = ["journalist", "admin"] as const;
const adminOnly = ["admin"] as const;

router.get("/issues", optionalAuthMiddleware, listIssuesHandler);
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
