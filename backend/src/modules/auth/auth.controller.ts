import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import { canAccessManagerCabinet } from "../houses/house.permissions.js";
import { listUserHouseMemberships } from "../houses/houses.permissions.js";
import {
  loginUser,
  registerUser,
  updateProfile,
} from "./auth.service.js";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "./auth.schema.js";

async function authExtrasForUser(
  userId: string,
  role: NonNullable<Request["profile"]>["role"],
) {
  const rows = await listUserHouseMemberships(userId);
  return {
    houseMemberships: rows.map((row) => ({
      id: row.id,
      houseId: row.house_id,
      role: row.house_role,
      status: row.status,
    })),
    canAccessManagerCabinet: canAccessManagerCabinet(
      role,
      rows.map((row) => ({
        role: row.house_role,
        status: row.status,
      })),
    ),
  };
}

export const registerHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await registerUser(req.body as RegisterInput);

    sendSuccess(res, 201, {
      message: "User registered successfully",
    });
  },
);

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const session = await loginUser(req.body as LoginInput);

  sendSuccess(res, 200, {
    message: "Login successful",
    data: session,
  });
});

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
  const extras = await authExtrasForUser(req.user!.id, req.profile!.role);

  sendSuccess(res, 200, {
    data: {
      user: req.user!,
      profile: req.profile!,
      role: req.profile!.role,
      ...extras,
    },
  });
});

export const logoutHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    sendSuccess(res, 200, {
      message: "Logged out successfully",
    });
  },
);

export const updateProfileHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await updateProfile(
      req.user!.id,
      req.body as UpdateProfileInput,
    );
    const extras = await authExtrasForUser(req.user!.id, profile.role);

    sendSuccess(res, 200, {
      message: "Profile updated",
      data: {
        user: req.user!,
        profile,
        role: profile.role,
        ...extras,
      },
    });
  },
);
