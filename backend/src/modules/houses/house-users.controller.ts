import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { UnauthorizedError } from "../../common/errors.js";
import { sendSuccess } from "../../common/response.js";
import type { AssignHouseUserBody } from "./house-users.schema.js";
import {
  assignHouseUser,
  listHouseUsers,
  removeHouseUser,
} from "./house-users.service.js";

function requireAuthContext(req: Request): {
  role: NonNullable<Request["profile"]>["role"];
} {
  if (!req.user || !req.profile) {
    throw new UnauthorizedError();
  }

  return { role: req.profile.role };
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
    const { role } = requireAuthContext(req);
    const users = await listHouseUsers(getHouseId(req), role);
    sendSuccess(res, 200, { data: users });
  },
);

export const assignHouseUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = requireAuthContext(req);
    const body = req.body as AssignHouseUserBody;
    const user = await assignHouseUser(
      getHouseId(req),
      {
        userId: body.userId,
        houseRole: body.houseRole,
      },
      role,
    );
    sendSuccess(res, 201, { data: user, message: "User assigned to house" });
  },
);

export const removeHouseUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = requireAuthContext(req);
    await removeHouseUser(getHouseId(req), req.params.userId!, role);
    sendSuccess(res, 200, { message: "User removed from house" });
  },
);
