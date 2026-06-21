import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { UnauthorizedError } from "../../common/errors.js";
import { sendSuccess } from "../../common/response.js";
import type { CreateHouseBody, UpdateHouseBody } from "./houses.schema.js";
import {
  createHouse,
  deleteHouse,
  getHouseById,
  getHouseDashboard,
  listHouses,
  updateHouse,
} from "./houses.service.js";

function requireAuthContext(req: Request): { userId: string; role: NonNullable<Request["profile"]>["role"] } {
  if (!req.user || !req.profile) {
    throw new UnauthorizedError();
  }

  return {
    userId: req.user.id,
    role: req.profile.role,
  };
}

export const listHousesHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId, role } = requireAuthContext(req);
  const houses = await listHouses(userId, role);
  sendSuccess(res, 200, { data: houses });
});

export const getHouseHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId, role } = requireAuthContext(req);
  const house = await getHouseById(req.params.id!, userId, role);
  sendSuccess(res, 200, { data: house });
});

export const createHouseHandler = asyncHandler(async (req: Request, res: Response) => {
  const { role } = requireAuthContext(req);
  const body = req.body as CreateHouseBody;
  const house = await createHouse(body, role);
  sendSuccess(res, 201, { data: house, message: "House created" });
});

export const updateHouseHandler = asyncHandler(async (req: Request, res: Response) => {
  const { role } = requireAuthContext(req);
  const body = req.body as UpdateHouseBody;
  const house = await updateHouse(req.params.id!, body, role);
  sendSuccess(res, 200, { data: house, message: "House updated" });
});

export const deleteHouseHandler = asyncHandler(async (req: Request, res: Response) => {
  const { role } = requireAuthContext(req);
  await deleteHouse(req.params.id!, role);
  sendSuccess(res, 200, { message: "House deleted" });
});

export const getHouseDashboardHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    const dashboard = await getHouseDashboard(req.params.id!, userId, role);
    sendSuccess(res, 200, { data: dashboard });
  },
);
