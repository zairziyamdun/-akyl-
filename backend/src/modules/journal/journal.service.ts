import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  DatabaseError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import {
  assertStatusTransition,
  canViewUnpublished,
} from "./journal.permissions.js";
import { createSignedPdfUrl, downloadPdfFromStorage } from "./journal.storage.js";
import type {
  CreateJournalIssueInput,
  JournalIssue,
  JournalIssueWithAuthor,
  JournalStatus,
  UpdateJournalIssueInput,
} from "./journal.types.js";

async function enrichWithAuthorNames(
  issues: JournalIssue[],
): Promise<JournalIssueWithAuthor[]> {
  if (issues.length === 0) return [];

  const userIds = [
    ...new Set(issues.map((i) => i.created_by).filter(Boolean)),
  ] as string[];

  const supabase = getSupabaseAdmin();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", userIds);

  const nameById = new Map(
    (profiles ?? []).map((p) => [p.id as string, (p.full_name as string | null) ?? null]),
  );

  return issues.map((issue) => ({
    ...issue,
    author_name: issue.created_by ? nameById.get(issue.created_by) ?? null : null,
  }));
}

function mapIssue(row: JournalIssue): JournalIssue {
  return row;
}

export async function listJournalIssues(
  role?: ProfileRole,
): Promise<JournalIssueWithAuthor[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("journal_issues").select("*").order("updated_at", { ascending: false });

  if (!canViewUnpublished(role)) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    throw new DatabaseError("Failed to fetch journal issues", error);
  }

  return enrichWithAuthorNames((data ?? []).map(mapIssue));
}

export async function getJournalIssueById(
  id: string,
  role?: ProfileRole,
): Promise<JournalIssueWithAuthor> {
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

  const [enriched] = await enrichWithAuthorNames([issue]);
  return enriched;
}

export async function createJournalIssue(
  input: CreateJournalIssueInput,
  userId: string,
): Promise<JournalIssueWithAuthor> {
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

  const [enriched] = await enrichWithAuthorNames([mapIssue(data as JournalIssue)]);
  return enriched;
}

export async function updateJournalIssue(
  id: string,
  input: UpdateJournalIssueInput,
  role: ProfileRole,
): Promise<JournalIssueWithAuthor> {
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

  const [enriched] = await enrichWithAuthorNames([mapIssue(data as JournalIssue)]);
  return enriched;
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
): Promise<JournalIssueWithAuthor> {
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

export async function assertIssuePdfAccess(
  id: string,
  role?: ProfileRole,
): Promise<JournalIssueWithAuthor> {
  const issue = await getJournalIssueById(id, role);

  if (!issue.pdf_url) {
    throw new ValidationError("PDF is not available for this issue");
  }

  const isEditor = role === "journalist" || role === "admin";

  if (isEditor) {
    return issue;
  }

  if (issue.status !== "published") {
    throw new ForbiddenError("Issue is not published");
  }

  if (issue.access_type !== "free") {
    throw new ForbiddenError("Нужен доступ");
  }

  return issue;
}

export async function getIssuePdfSignedUrl(
  id: string,
  role?: ProfileRole,
): Promise<string> {
  const issue = await assertIssuePdfAccess(id, role);
  return createSignedPdfUrl(issue.pdf_url!);
}

export async function getIssuePdfFile(
  id: string,
  role?: ProfileRole,
): Promise<{ buffer: Buffer; fileName: string }> {
  const issue = await assertIssuePdfAccess(id, role);
  const buffer = await downloadPdfFromStorage(issue.pdf_url!);
  const pathName = issue.pdf_url!.split("/").pop() ?? "issue.pdf";
  const fileName = pathName.includes("-")
    ? pathName.slice(pathName.indexOf("-") + 1)
    : pathName;

  return { buffer, fileName };
}
