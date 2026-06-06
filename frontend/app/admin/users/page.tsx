"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/Button";
import { mockUsers } from "@/data/dashboardMockData";
import type { AkylRole } from "@/lib/auth/mockAuth";

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<AkylRole | "all">("all");

  const filtered = useMemo(
    () =>
      roleFilter === "all"
        ? mockUsers
        : mockUsers.filter((u) => u.role === roleFilter),
    [roleFilter],
  );

  return (
    <>
      <PageHeader
        title="Пользователи"
        description="Управление аккаунтами платформы AKYL"
        actions={
          <Button size="sm" onClick={() => alert("Mock: создать пользователя")}>
            Добавить
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "admin", "journalist", "user"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRoleFilter(r)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
              roleFilter === r
                ? "bg-sky-50 text-sky-800 ring-sky-200"
                : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {r === "all" ? "Все" : r}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered}
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
              <StatusBadge status={u.status === "active" ? "active" : "suspended"} />
            ),
          },
          { key: "created", header: "Создан", render: (u) => u.createdAt },
          {
            key: "actions",
            header: "",
            className: "text-right",
            render: () => (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert("Mock actions menu")}
              >
                ⋯
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
