"use client";

import { useEffect, useState } from "react";

import { PageHeader } from "@/widgets/dashboard-shell";
import { RoleBadge } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { AuthApiError, useAuth } from "@/features/auth";
import type { AkylRole } from "@/entities/session";

type ProfileFormProps = {
  title?: string;
  description?: string;
};

export function ProfileForm({
  title = "Профиль",
  description = "Личные данные и настройки аккаунта",
}: ProfileFormProps) {
  const { user, role, profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFullName(user.name);
    setOrganization(user.organization);
    setPhone(profile?.phone ?? user.phone ?? "");
  }, [user, profile]);

  if (!user || !role) return null;

  return (
    <>
      <PageHeader title={title} description={description} />

      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-lg font-semibold text-sky-800">
            {user.initials}
          </span>
          <div>
            <p className="font-medium text-slate-900">{user.name}</p>
            <RoleBadge role={role as AkylRole} className="mt-1" />
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setSaving(true);
            setError("");
            setSuccess(false);
            try {
              await updateProfile({ full_name: fullName, organization, phone });
              setSuccess(true);
            } catch (err) {
              setError(
                err instanceof AuthApiError
                  ? err.message
                  : "Не удалось сохранить профиль",
              );
            } finally {
              setSaving(false);
            }
          }}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Имя</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={saving}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <Input value={user.email} type="email" readOnly disabled />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Организация
            </label>
            <Input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              disabled={saving}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Телефон</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          {success ? (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Профиль сохранён
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </form>
      </div>
    </>
  );
}
