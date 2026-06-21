import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
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

const houseReaders = ["admin", "manager"] as const;
const adminOnly = ["admin"] as const;

router.get(
  "/",
  authMiddleware,
  roleMiddleware([...houseReaders]),
  listFinanceRecordsHandler,
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  validateBody(createFinanceRecordSchema),
  createFinanceRecordHandler,
);

router.patch(
  "/:recordId",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  validateBody(updateFinanceRecordSchema),
  updateFinanceRecordHandler,
);

router.delete(
  "/:recordId",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  deleteFinanceRecordHandler,
);

export default router;
