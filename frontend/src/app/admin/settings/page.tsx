"use client";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PageHeader } from "@/widgets/dashboard-shell";

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
              <label
                htmlFor="settings-platform-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Название платформы
              </label>
              <Input id="settings-platform-name" defaultValue="AKYL" />
            </div>
            <div>
              <label
                htmlFor="settings-support-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email поддержки
              </label>
              <Input
                id="settings-support-email"
                defaultValue="support@akyl.kz"
                type="email"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Интеграции
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="settings-supabase-url"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Supabase URL
              </label>
              <Input
                id="settings-supabase-url"
                defaultValue="https://xxx.supabase.co"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="settings-telegram-chat-id"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Telegram Chat ID
              </label>
              <Input
                id="settings-telegram-chat-id"
                defaultValue="••••••••"
                disabled
              />
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
