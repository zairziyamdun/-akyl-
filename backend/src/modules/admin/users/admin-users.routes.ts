import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../../middleware/auth.middleware.js";
import { validateBody } from "../../../middleware/validate.middleware.js";
import {
  listAdminUsersHandler,
  updateUserRoleHandler,
  updateUserStatusHandler,
} from "./admin-users.controller.js";
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
} from "./admin-users.schema.js";

const router = Router();

const adminOnly = ["admin"] as const;

router.use(authMiddleware, roleMiddleware([...adminOnly]));

router.get("/", listAdminUsersHandler);

router.patch(
  "/:id/role",
  validateBody(updateUserRoleSchema),
  updateUserRoleHandler,
);

router.patch(
  "/:id/status",
  validateBody(updateUserStatusSchema),
  updateUserStatusHandler,
);

export default router;
