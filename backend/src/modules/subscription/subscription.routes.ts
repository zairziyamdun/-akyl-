import { Router } from "express";

import { getPublicSubscriptionHandler } from "./subscription.controller.js";

const subscriptionRouter = Router();

/** Public — active journal subscription offer */
subscriptionRouter.get("/", getPublicSubscriptionHandler);

export default subscriptionRouter;
