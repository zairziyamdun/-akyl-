import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../../middleware/auth.middleware.js";
import { validateBody } from "../../../middleware/validate.middleware.js";
import {
  getAdminSubscriptionHandler,
  listAdminSubscribersHandler,
  patchAdminSubscriptionHandler,
} from "../../subscription/subscription.controller.js";
import { updateSubscriptionSettingsSchema } from "../../subscription/subscription.schema.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", getAdminSubscriptionHandler);

router.get("/subscribers", listAdminSubscribersHandler);

router.patch(
  "/",
  validateBody(updateSubscriptionSettingsSchema),
  patchAdminSubscriptionHandler,
);

export default router;
