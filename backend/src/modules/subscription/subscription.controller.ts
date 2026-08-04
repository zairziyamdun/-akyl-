import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import type { UpdateSubscriptionSettingsInput } from "./subscription.schema.js";
import {
  getActiveSubscriptionSettings,
  getSubscriptionSettingsForAdmin,
  updateSubscriptionSettings,
} from "./subscription.service.js";

export const getPublicSubscriptionHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const settings = await getActiveSubscriptionSettings();
    sendSuccess(res, 200, { data: settings });
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
