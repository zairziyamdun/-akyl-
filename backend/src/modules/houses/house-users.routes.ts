import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  assignHouseUserHandler,
  listHouseUsersHandler,
  removeHouseUserHandler,
} from "./house-users.controller.js";
import { assignHouseUserSchema } from "./house-users.schema.js";

const router = Router({ mergeParams: true });

/** Service layer enforces members.read / members.manage (or platform manage_all). */
router.get("/", authMiddleware, listHouseUsersHandler);

router.post(
  "/",
  authMiddleware,
  validateBody(assignHouseUserSchema),
  assignHouseUserHandler,
);

router.delete("/:userId", authMiddleware, removeHouseUserHandler);

export default router;
