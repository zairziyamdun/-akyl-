import type { Request, Response } from "express";

import { asyncHandler } from "../../../common/async-handler.js";
import { sendSuccess } from "../../../common/response.js";
import type {
  UpdateUserRoleBody,
  UpdateUserStatusBody,
} from "./admin-users.schema.js";
import {
  listAdminUsers,
  updateUserRole,
  updateUserStatus,
} from "./admin-users.service.js";

export const listAdminUsersHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await listAdminUsers();
    sendSuccess(res, 200, { data: users });
  },
);

export const updateUserRoleHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = req.body as UpdateUserRoleBody;
    const user = await updateUserRole(req.params.id!, role);
    sendSuccess(res, 200, { data: user, message: "Role updated" });
  },
);

export const updateUserStatusHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body as UpdateUserStatusBody;
    const user = await updateUserStatus(req.params.id!, status);
    sendSuccess(res, 200, { data: user, message: "Status updated" });
  },
);
