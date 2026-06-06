"use client";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="Настройки"
        description="Конфигурация платформы (mock — без сохранения)"
      />

      <div className="grid max-w-2xl gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Общие
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Название платформы
              </label>
              <Input defaultValue="AKYL" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email поддержки
              </label>
              <Input defaultValue="support@akyl.kz" type="email" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Интеграции
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Supabase URL
              </label>
              <Input defaultValue="https://xxx.supabase.co" disabled />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Telegram Chat ID
              </label>
              <Input defaultValue="••••••••" disabled />
            </div>
          </div>
        </section>

        <Button onClick={() => alert("Mock: настройки сохранены")}>
          Сохранить изменения
        </Button>
      </div>
    </>
  );
}
