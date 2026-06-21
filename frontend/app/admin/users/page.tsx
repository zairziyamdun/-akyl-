"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  ADMIN_USER_ROLE_LABELS,
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUS_LABELS,
  ADMIN_USER_STATUSES,
  adminUserDisplayName,
  adminUserStatusVariant,
  formatAdminUserDate,
  normalizeAdminUserStatus,
  type AdminUser,
  type AdminUserRole,
  type AdminUserStatus,
} from "@/lib/admin/types";
import {
  AdminUsersApiError,
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
} from "@/lib/admin/usersApi";
import type { AkylRole } from "@/lib/auth/types";

type RoleFilter = AkylRole | "all";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      const message =
        err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось загрузить пользователей";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const filtered = useMemo(
    () =>
      roleFilter === "all"
        ? users
        : users.filter((user) => user.role === roleFilter),
    [roleFilter, users],
  );

  const handleRoleChange = async (userId: string, role: AdminUserRole) => {
    const current = users.find((user) => user.id === userId);
    if (!current || current.role === role) {
      return;
    }

    setUpdatingRoleId(userId);
    setError(null);

    try {
      const updated = await updateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updated : user)),
      );
    } catch (err) {
      const message =
        err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось обновить роль";
      setError(message);
    } finally {
      setUpdatingRoleId(null);
    }
  };

  const handleStatusChange = async (userId: string, status: AdminUserStatus) => {
    const current = users.find((user) => user.id === userId);
    if (!current || normalizeAdminUserStatus(current.status) === status) {
      return;
    }

    setUpdatingStatusId(userId);
    setError(null);

    try {
      const updated = await updateUserStatus(userId, status);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updated : user)),
      );
    } catch (err) {
      const message =
        err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось обновить статус";
      setError(message);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Пользователи"
        description="Управление аккаунтами платформы AKYL"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "admin", "manager", "journalist", "user"] as const).map(
          (role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
                roleFilter === role
                  ? "bg-sky-50 text-sky-800 ring-sky-200"
                  : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {role === "all" ? "Все" : ADMIN_USER_ROLE_LABELS[role]}
            </button>
          ),
        )}
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          Загрузка пользователей…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          Пользователи не найдены
        </div>
      ) : (
        <DataTable
          data={filtered}
          keyExtractor={(user) => user.id}
          columns={[
            {
              key: "name",
              header: "Имя",
              render: (user) => adminUserDisplayName(user),
            },
            {
              key: "email",
              header: "Email",
              render: (user) => user.email ?? "—",
            },
            {
              key: "organization",
              header: "Организация",
              render: (user) => user.organization ?? "—",
            },
            {
              key: "phone",
              header: "Телефон",
              render: (user) => user.phone ?? "—",
            },
            {
              key: "role",
              header: "Роль",
              render: (user) => (
                <select
                  value={user.role}
                  disabled={updatingRoleId === user.id}
                  onChange={(event) =>
                    void handleRoleChange(
                      user.id,
                      event.target.value as AdminUserRole,
                    )
                  }
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 disabled:opacity-50"
                  aria-label={`Роль пользователя ${adminUserDisplayName(user)}`}
                >
                  {ADMIN_USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ADMIN_USER_ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              key: "status",
              header: "Статус",
              render: (user) => (
                <div className="flex flex-col gap-2">
                  <StatusBadge status={adminUserStatusVariant(user.status)} />
                  <select
                    value={normalizeAdminUserStatus(user.status)}
                    disabled={updatingStatusId === user.id}
                    onChange={(event) =>
                      void handleStatusChange(
                        user.id,
                        event.target.value as AdminUserStatus,
                      )
                    }
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 disabled:opacity-50"
                    aria-label={`Статус пользователя ${adminUserDisplayName(user)}`}
                  >
                    {ADMIN_USER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {ADMIN_USER_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>
              ),
            },
            {
              key: "created",
              header: "Создан",
              render: (user) => formatAdminUserDate(user.created_at),
            },
          ]}
        />
      )}
    </>
  );
}
