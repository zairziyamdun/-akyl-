import { getSupabaseAdmin } from "../../config/supabase.js";
import { DatabaseError, ForbiddenError, UnauthorizedError } from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import {
  assertStatusTransition,
  canViewUnpublished,
} from "./journal.permissions.js";
import type {
  CreateJournalIssueInput,
  JournalIssue,
  JournalStatus,
  UpdateJournalIssueInput,
} from "./journal.types.js";

function mapIssue(row: JournalIssue): JournalIssue {
  return row;
}

export async function listJournalIssues(role?: ProfileRole): Promise<JournalIssue[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("journal_issues").select("*").order("updated_at", { ascending: false });

  if (!canViewUnpublished(role)) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    throw new DatabaseError("Failed to fetch journal issues", error);
  }

  return (data ?? []).map(mapIssue);
}

export async function getJournalIssueById(
  id: string,
  role?: ProfileRole,
): Promise<JournalIssue> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("journal_issues")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new DatabaseError("Journal issue not found", error);
  }

  const issue = mapIssue(data as JournalIssue);

  if (issue.status !== "published" && !canViewUnpublished(role)) {
    throw new ForbiddenError("Issue is not published");
  }

  return issue;
}

export async function createJournalIssue(
  input: CreateJournalIssueInput,
  userId: string,
): Promise<JournalIssue> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("journal_issues")
    .insert({
      title: input.title,
      issue_number: input.issue_number,
      description: input.description,
      cover_url: input.cover_url ?? null,
      pdf_url: input.pdf_url ?? null,
      access_type: input.access_type,
      status: "draft",
      created_by: userId,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to create journal issue", error);
  }

  return mapIssue(data as JournalIssue);
}

export async function updateJournalIssue(
  id: string,
  input: UpdateJournalIssueInput,
  role: ProfileRole,
): Promise<JournalIssue> {
  const existing = await getJournalIssueById(id, role);

  if (input.status && input.status !== existing.status) {
    assertStatusTransition(existing.status, input.status, role);
  }

  const supabase = getSupabaseAdmin();
  const patch: Record<string, unknown> = { ...input };

  if (input.status === "published" && existing.status !== "published") {
    patch.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("journal_issues")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to update journal issue", error);
  }

  return mapIssue(data as JournalIssue);
}

export async function deleteJournalIssue(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("journal_issues").delete().eq("id", id);

  if (error) {
    throw new DatabaseError("Failed to delete journal issue", error);
  }
}

export async function transitionJournalIssue(
  id: string,
  toStatus: JournalStatus,
  role: ProfileRole,
): Promise<JournalIssue> {
  const existing = await getJournalIssueById(id, role);
  assertStatusTransition(existing.status, toStatus, role);
  return updateJournalIssue(id, { status: toStatus }, role);
}

export function assertIssueOwnerOrAdmin(
  issue: JournalIssue,
  userId: string,
  role: ProfileRole,
): void {
  if (role === "admin") return;
  if (role === "journalist" && issue.created_by === userId) return;
  throw new ForbiddenError("You can only edit your own issues");
}

export function assertAuthenticated(userId?: string): asserts userId is string {
  if (!userId) {
    throw new UnauthorizedError();
  }
}
