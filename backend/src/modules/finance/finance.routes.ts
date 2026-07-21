import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  createFinanceRecordHandler,
  deleteFinanceRecordHandler,
  listFinanceRecordsHandler,
  updateFinanceRecordHandler,
} from "./finance.controller.js";
import {
  createFinanceRecordSchema,
  updateFinanceRecordSchema,
} from "./finance.schema.js";

const router = Router({ mergeParams: true });

/** Service layer enforces house membership + finance permissions. */
router.get("/", authMiddleware, listFinanceRecordsHandler);

router.post(
  "/",
  authMiddleware,
  validateBody(createFinanceRecordSchema),
  createFinanceRecordHandler,
);

router.patch(
  "/:recordId",
  authMiddleware,
  validateBody(updateFinanceRecordSchema),
  updateFinanceRecordHandler,
);

router.delete("/:recordId", authMiddleware, deleteFinanceRecordHandler);

export default router;
