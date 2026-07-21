import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../../middleware/auth.middleware.js";
import { validateBody } from "../../../middleware/validate.middleware.js";
import {
  createAdminUserHandler,
  deleteAdminUserHandler,
  listAdminUsersHandler,
  updateUserRoleHandler,
  updateUserStatusHandler,
} from "./admin-users.controller.js";
import {
  createAdminUserSchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
} from "./admin-users.schema.js";

const router = Router();

const adminOnly = ["admin"] as const;

router.use(authMiddleware, roleMiddleware([...adminOnly]));

router.get("/", listAdminUsersHandler);

router.post(
  "/",
  validateBody(createAdminUserSchema),
  createAdminUserHandler,
);

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

router.delete("/:id", deleteAdminUserHandler);

export default router;
