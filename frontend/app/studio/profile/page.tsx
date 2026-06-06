"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useMockAuth } from "@/lib/auth/MockAuthProvider";

export default function StudioProfilePage() {
  const { user } = useMockAuth();

  return (
    <>
      <PageHeader title="Профиль" description="Данные редакционного аккаунта" />

      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-lg font-semibold text-sky-800">
            {user.initials}
          </span>
          <div>
            <p className="font-medium text-slate-900">{user.name}</p>
            <RoleBadge role="journalist" className="mt-1" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <Input defaultValue={user.email} type="email" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Организация
            </label>
            <Input defaultValue={user.organization} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Био</label>
            <textarea
              className="min-h-[100px] w-full rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none"
              defaultValue="Журналист AKYL, специализация — управление МЖД и KPI."
            />
          </div>
          <Button onClick={() => alert("Mock: профиль сохранён")}>Сохранить</Button>
        </div>
      </div>
    </>
  );
}
