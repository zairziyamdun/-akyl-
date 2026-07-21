"use client";

import { PageHeader } from "@/widgets/dashboard-shell";

export default function AppSettingsPage() {
  return (
    <>
      <PageHeader
        title="Настройки"
        description="Настройки аккаунта платформы AKYL"
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        Раздел настроек аккаунта. Данные появятся позже.
      </div>
    </>
  );
}
