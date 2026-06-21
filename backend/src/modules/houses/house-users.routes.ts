import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  assignHouseUserHandler,
  listHouseUsersHandler,
  removeHouseUserHandler,
} from "./house-users.controller.js";
import { assignHouseUserSchema } from "./house-users.schema.js";

const router = Router({ mergeParams: true });

const adminOnly = ["admin"] as const;

router.get(
  "/",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  listHouseUsersHandler,
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  validateBody(assignHouseUserSchema),
  assignHouseUserHandler,
);

router.delete(
  "/:userId",
  authMiddleware,
  roleMiddleware([...adminOnly]),
  removeHouseUserHandler,
);

export default router;
