import type { Request, Response } from "express";

import { asyncHandler } from "../../../common/async-handler.js";
import { UnauthorizedError } from "../../../common/errors.js";
import { sendSuccess } from "../../../common/response.js";
import type {
  CreateAdminUserBody,
  UpdateUserRoleBody,
  UpdateUserStatusBody,
} from "./admin-users.schema.js";
import {
  createAdminUser,
  deleteAdminUser,
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

export const createAdminUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body as CreateAdminUserBody;
    const user = await createAdminUser(body);
    sendSuccess(res, 201, { data: user, message: "User created" });
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

export const deleteAdminUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    await deleteAdminUser(req.params.id!, req.user.id);
    sendSuccess(res, 200, { message: "User deleted" });
  },
);
