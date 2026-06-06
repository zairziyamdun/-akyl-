"use client";

import Link from "next/link";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  mockAccessibleMaterials,
  mockSubscriptions,
  mockUserMaterials,
} from "@/data/dashboardMockData";

export default function UserAppDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "пользователь";
  const savedCount = mockUserMaterials.filter((m) => m.saved).length;
  const activeSubs = mockSubscriptions.filter((s) => s.status === "active").length;

  return (
    <>
      <PageHeader
        title={`Здравствуйте, ${firstName}`}
        description="Ваш личный кабинет AKYL"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Сохранённые материалы" value={String(savedCount)} hint="в библиотеке" />
        <StatCard label="Активные подписки" value={String(activeSubs)} hint="из 2 доступных" />
        <StatCard
          label="Доступно материалов"
          value={String(mockAccessibleMaterials.length)}
          hint="открытых"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
              Мои материалы
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/materials">Все</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {mockUserMaterials.slice(0, 3).map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{m.title}</p>
                  <p className="text-xs text-slate-500">{m.type}</p>
                </div>
                {m.saved ? (
                  <span className="text-xs text-sky-600">Сохранено</span>
                ) : (
                  <span className="text-xs text-slate-400">Доступно</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
              Доступные материалы
            </h2>
          </div>
          <ul className="space-y-3">
            {mockAccessibleMaterials.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3"
              >
                <p className="text-sm text-slate-800">{m.title}</p>
                {m.access === "open" ? (
                  <Button variant="ghost" size="sm">
                    Открыть
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400">🔒 Pro</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
