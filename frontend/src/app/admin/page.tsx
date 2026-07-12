import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import {
  DataTable,
  mockAdminStats,
  mockConsultationRequests,
  mockSystemStatuses,
  mockUsers,
  PageHeader,
  RoleBadge,
  StatCard,
  StatusBadge,
} from "@/widgets/dashboard-shell";

export default function AdminDashboardPage() {
  const recentRequests = mockConsultationRequests.slice(0, 4);
  const recentUsers = mockUsers.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Обзор платформы AKYL: пользователи, заявки и статус системы"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockAdminStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
              Последние заявки
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/requests">Все заявки</Link>
            </Button>
          </div>
          <DataTable
            data={recentRequests}
            keyExtractor={(r) => r.id}
            columns={[
              { key: "name", header: "Имя", render: (r) => r.name },
              {
                key: "org",
                header: "Организация",
                render: (r) => r.organization,
              },
              {
                key: "status",
                header: "Статус",
                render: (r) => <StatusBadge status={r.status} />,
              },
              { key: "date", header: "Дата", render: (r) => r.createdAt },
            ]}
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Статус системы
          </h2>
          <ul className="space-y-3">
            {mockSystemStatuses.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.detail}</p>
                </div>
                <StatusBadge status={s.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
            Пользователи
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/users">Все пользователи</Link>
          </Button>
        </div>
        <DataTable
          data={recentUsers}
          keyExtractor={(u) => u.id}
          columns={[
            { key: "name", header: "Имя", render: (u) => u.name },
            { key: "email", header: "Email", render: (u) => u.email },
            {
              key: "role",
              header: "Роль",
              render: (u) => <RoleBadge role={u.role} />,
            },
            {
              key: "status",
              header: "Статус",
              render: (u) => (
                <StatusBadge
                  status={u.status === "active" ? "active" : "suspended"}
                />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
