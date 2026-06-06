import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import {
  loginUser,
  registerUser,
  updateProfile,
} from "./auth.service.js";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "./auth.schema.js";

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
  sendSuccess(res, 200, {
    data: {
      user: req.user!,
      profile: req.profile!,
      role: req.profile!.role,
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
    const profile = await updateProfile(req.user!.id, req.body as UpdateProfileInput);

    sendSuccess(res, 200, {
      message: "Profile updated",
      data: {
        user: req.user!,
        profile,
        role: profile.role,
      },
    });
  },
);
