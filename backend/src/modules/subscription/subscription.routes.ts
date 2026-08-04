import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  createMySubscriptionHandler,
  getMySubscriptionHandler,
  getPublicSubscriptionHandler,
} from "./subscription.controller.js";

const subscriptionRouter = Router();

/** Public — journal subscription offer (isActive controls checkout CTA on the site) */
subscriptionRouter.get("/", getPublicSubscriptionHandler);

subscriptionRouter.get("/me", authMiddleware, getMySubscriptionHandler);
subscriptionRouter.post("/me", authMiddleware, createMySubscriptionHandler);

export default subscriptionRouter;
