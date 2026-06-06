import { ForbiddenError } from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import type { JournalStatus } from "./journal.types.js";

/** Status transitions enforced by role. */
const TRANSITIONS: Record<
  JournalStatus,
  Partial<Record<JournalStatus, ProfileRole[]>>
> = {
  draft: { review: ["journalist", "admin"] },
  review: {
    published: ["admin"],
    draft: ["admin"],
  },
  published: { archived: ["admin"] },
  archived: { published: ["admin"] },
};

export function assertStatusTransition(
  from: JournalStatus,
  to: JournalStatus,
  role: ProfileRole,
): void {
  if (from === to) return;

  const allowedRoles = TRANSITIONS[from]?.[to];
  if (!allowedRoles || !allowedRoles.includes(role)) {
    throw new ForbiddenError(
      `Transition ${from} → ${to} is not allowed for role ${role}`,
    );
  }
}

export function canViewUnpublished(role?: ProfileRole): boolean {
  return role === "journalist" || role === "admin";
}
