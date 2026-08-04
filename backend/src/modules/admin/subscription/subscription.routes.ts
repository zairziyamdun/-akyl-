import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../../middleware/auth.middleware.js";
import { validateBody } from "../../../middleware/validate.middleware.js";
import {
  getAdminSubscriptionHandler,
  listAdminSubscribersHandler,
  patchAdminSubscriberHandler,
  patchAdminSubscriptionHandler,
} from "../../subscription/subscription.controller.js";
import {
  updateJournalSubscriptionSchema,
  updateSubscriptionSettingsSchema,
} from "../../subscription/subscription.schema.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", getAdminSubscriptionHandler);

router.get("/subscribers", listAdminSubscribersHandler);

router.patch(
  "/subscribers/:id",
  validateBody(updateJournalSubscriptionSchema),
  patchAdminSubscriberHandler,
);

router.patch(
  "/",
  validateBody(updateSubscriptionSettingsSchema),
  patchAdminSubscriptionHandler,
);

export default router;
