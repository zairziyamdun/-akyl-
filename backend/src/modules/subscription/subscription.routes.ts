import { Router } from "express";

import { getPublicSubscriptionHandler } from "./subscription.controller.js";

const subscriptionRouter = Router();

/** Public — journal subscription offer (isActive controls checkout CTA on the site) */
subscriptionRouter.get("/", getPublicSubscriptionHandler);

export default subscriptionRouter;
