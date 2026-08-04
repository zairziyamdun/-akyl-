import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { UnauthorizedError, ValidationError } from "../../common/errors.js";
import { sendSuccess } from "../../common/response.js";
import type {
  UpdateJournalSubscriptionInput,
  UpdateSubscriptionSettingsInput,
} from "./subscription.schema.js";
import {
  createMySubscription,
  getMySubscriptionOverview,
  getPublicSubscriptionSettings,
  getSubscriptionSettingsForAdmin,
  listJournalSubscriptions,
  updateJournalSubscriptionByAdmin,
  updateSubscriptionSettings,
} from "./subscription.service.js";

export const getPublicSubscriptionHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const settings = await getPublicSubscriptionSettings();
    sendSuccess(res, 200, { data: settings });
  },
);

export const getMySubscriptionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new UnauthorizedError();
    }
    const overview = await getMySubscriptionOverview(req.user.id);
    sendSuccess(res, 200, { data: overview });
  },
);

export const createMySubscriptionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new UnauthorizedError();
    }
    const subscription = await createMySubscription(req.user.id);
    sendSuccess(res, 201, {
      data: subscription,
      message: "Subscription checkout started",
    });
  },
);

export const getAdminSubscriptionHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const settings = await getSubscriptionSettingsForAdmin();
    sendSuccess(res, 200, { data: settings });
  },
);

export const patchAdminSubscriptionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as UpdateSubscriptionSettingsInput;
    const settings = await updateSubscriptionSettings(body);
    sendSuccess(res, 200, {
      data: settings,
      message: "Subscription settings updated",
    });
  },
);

export const listAdminSubscribersHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const subscriptions = await listJournalSubscriptions();
    sendSuccess(res, 200, { data: subscriptions });
  },
);

export const patchAdminSubscriberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new ValidationError("Subscription id is required");
    }
    const body = req.body as UpdateJournalSubscriptionInput;
    const subscription = await updateJournalSubscriptionByAdmin(id, body);
    sendSuccess(res, 200, {
      data: subscription,
      message: "Subscription updated",
    });
  },
);
