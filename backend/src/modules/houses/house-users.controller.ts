import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { UnauthorizedError } from "../../common/errors.js";
import { sendSuccess } from "../../common/response.js";
import type {
  AssignHouseUserBody,
  UpdateHouseUserBody,
} from "./house-users.schema.js";
import {
  assignHouseUser,
  listHouseUsers,
  removeHouseUser,
  updateHouseUser,
} from "./house-users.service.js";

function requireAuthContext(req: Request): {
  userId: string;
  role: NonNullable<Request["profile"]>["role"];
} {
  if (!req.user || !req.profile) {
    throw new UnauthorizedError();
  }

  return { userId: req.user.id, role: req.profile.role };
}

function getHouseId(req: Request): string {
  const houseId = req.params.houseId;
  if (!houseId) {
    throw new UnauthorizedError("Missing house id");
  }
  return houseId;
}

export const listHouseUsersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    const users = await listHouseUsers(getHouseId(req), userId, role);
    sendSuccess(res, 200, { data: users });
  },
);

export const assignHouseUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    const body = req.body as AssignHouseUserBody;
    const user = await assignHouseUser(
      getHouseId(req),
      {
        userId: body.userId,
        houseRole: body.houseRole,
        status: body.status,
      },
      userId,
      role,
    );
    sendSuccess(res, 201, { data: user, message: "User assigned to house" });
  },
);

export const updateHouseUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    const body = req.body as UpdateHouseUserBody;
    const user = await updateHouseUser(
      getHouseId(req),
      req.params.userId!,
      {
        houseRole: body.houseRole,
        status: body.status,
      },
      userId,
      role,
    );
    sendSuccess(res, 200, { data: user, message: "House user updated" });
  },
);

export const removeHouseUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    await removeHouseUser(getHouseId(req), req.params.userId!, userId, role);
    sendSuccess(res, 200, { message: "User removed from house" });
  },
);
