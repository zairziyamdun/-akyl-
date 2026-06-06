import type { AuthMeResponse, AuthUserResponse, Profile } from "../modules/auth/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserResponse;
      profile?: Profile;
      accessToken?: string;
    }
  }
}

export type { AuthMeResponse, AuthUserResponse, Profile };
