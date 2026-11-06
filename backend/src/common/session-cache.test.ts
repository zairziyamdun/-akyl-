import { afterEach, describe, expect, it, vi } from "vitest";

import type { Profile } from "../modules/auth/auth.types.js";
import {
  clearSessionCache,
  getCachedSession,
  invalidateUserSessions,
  setCachedSession,
} from "./session-cache.js";

const profile = (id: string): Profile => ({
  id,
  full_name: null,
  organization: null,
  phone: null,
  role: "admin",
  status: "active",
  created_at: "",
  updated_at: "",
});

const session = (id: string) => ({
  user: { id, email: `${id}@test.local` },
  profile: profile(id),
});

describe("session cache", () => {
  afterEach(() => {
    clearSessionCache();
    vi.useRealTimers();
  });

  it("returns a cached session until it expires", () => {
    vi.useFakeTimers();
    setCachedSession("t1", session("u1"));
    expect(getCachedSession("t1")?.user.id).toBe("u1");

    vi.advanceTimersByTime(31_000);
    expect(getCachedSession("t1")).toBeNull();
  });

  it("drops every token of a user on invalidation", () => {
    setCachedSession("t1", session("u1"));
    setCachedSession("t2", session("u1"));
    setCachedSession("t3", session("u2"));

    invalidateUserSessions("u1");

    expect(getCachedSession("t1")).toBeNull();
    expect(getCachedSession("t2")).toBeNull();
    expect(getCachedSession("t3")?.user.id).toBe("u2");
  });
});
