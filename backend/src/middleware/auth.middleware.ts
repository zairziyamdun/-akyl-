import type { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../common/async-handler.js";
import { ForbiddenError, UnauthorizedError } from "../common/errors.js";
import { getSupabaseAdmin } from "../config/supabase.js";
import { getProfileByUserId } from "../modules/auth/auth.service.js";
import { toAuthUser, type ProfileRole, isActiveProfileStatus } from "../modules/auth/auth.types.js";

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim();
}

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);

    if (!token) {
      throw new UnauthorizedError("Missing authorization token");
    }

    const { data, error } = await getSupabaseAdmin().auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    const profile = await getProfileByUserId(data.user.id);

    if (!isActiveProfileStatus(profile.status)) {
      throw new ForbiddenError("Account is not active");
    }

    req.user = toAuthUser(data.user);
    req.profile = profile;
    req.accessToken = token;

    next();
  },
);

export function roleMiddleware(allowedRoles: ProfileRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.profile) {
      next(new UnauthorizedError());
      return;
    }

    if (!allowedRoles.includes(req.profile.role)) {
      next(new ForbiddenError("Insufficient permissions"));
      return;
    }

    next();
  };
}

/** Sets req.user/req.profile when Bearer token is valid; continues as guest otherwise. */
export const optionalAuthMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);
    if (!token) {
      next();
      return;
    }

    try {
      const { data, error } = await getSupabaseAdmin().auth.getUser(token);

      if (!error && data.user) {
        const profile = await getProfileByUserId(data.user.id);
        if (isActiveProfileStatus(profile.status)) {
          req.user = toAuthUser(data.user);
          req.profile = profile;
          req.accessToken = token;
        }
      }
    } catch {
      // invalid token — treat as guest for public routes
    }

    next();
  },
);
