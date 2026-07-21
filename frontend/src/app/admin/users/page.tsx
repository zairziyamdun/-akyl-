"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PlatformRole } from "@/entities/session";
import {
  ADMIN_USER_ROLE_LABELS,
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUS_LABELS,
  ADMIN_USER_STATUSES,
  type AdminUser,
  type AdminUserRole,
  type AdminUserStatus,
  AdminUsersApiError,
  adminUserDisplayName,
  adminUserStatusVariant,
  createAdminUser,
  deleteAdminUser,
  formatAdminUserDate,
  getAdminUsers,
  normalizeAdminUserStatus,
  updateUserRole,
  updateUserStatus,
} from "@/entities/user";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, PageHeader, StatusBadge } from "@/widgets/dashboard-shell";

type RoleFilter = PlatformRole | "all";

type CreateFormState = {
  email: string;
  password: string;
  full_name: string;
  organization: string;
  phone: string;
  role: AdminUserRole;
  status: AdminUserStatus;
};

const EMPTY_CREATE_FORM: CreateFormState = {
  email: "",
  password: "",
  full_name: "",
  organization: "",
  phone: "",
  role: "user",
  status: "active",
};

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [createForm, setCreateForm] =
    useState<CreateFormState>(EMPTY_CREATE_FORM);

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

  const handleCreateFieldChange = <K extends keyof CreateFormState>(
    key: K,
    value: CreateFormState[K],
  ) => {
    setCreateForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const created = await createAdminUser(createForm);
      setUsers((prev) => [created, ...prev]);
      setCreateForm(EMPTY_CREATE_FORM);
      setFormOpen(false);
      setSuccess(`Пользователь «${adminUserDisplayName(created)}» создан`);
    } catch (err) {
      const message =
        err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось создать пользователя";
      setError(message);
    } finally {
      setCreating(false);
    }
  };

  const handleRoleChange = async (userId: string, role: AdminUserRole) => {
    const current = users.find((user) => user.id === userId);
    if (!current || current.role === role) {
      return;
    }

    setUpdatingRoleId(userId);
    setError(null);
    setSuccess(null);

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

  const handleStatusChange = async (
    userId: string,
    status: AdminUserStatus,
  ) => {
    const current = users.find((user) => user.id === userId);
    if (!current || normalizeAdminUserStatus(current.status) === status) {
      return;
    }

    setUpdatingStatusId(userId);
    setError(null);
    setSuccess(null);

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

  const handleDelete = async (user: AdminUser) => {
    if (currentUser?.id === user.id) {
      setError("Нельзя удалить собственный аккаунт");
      return;
    }

    const name = adminUserDisplayName(user);
    if (
      !window.confirm(
        `Удалить пользователя «${name}»? Действие необратимо: аккаунт, профиль и memberships ЖК будут удалены.`,
      )
    ) {
      return;
    }

    setDeletingId(user.id);
    setError(null);
    setSuccess(null);

    try {
      await deleteAdminUser(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
    } catch (err) {
      const message =
        err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось удалить пользователя";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Пользователи"
        description="Управление аккаунтами платформы AKYL"
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", "admin", "journalist", "user"] as const).map((role) => (
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
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setFormOpen((open) => !open);
            setError(null);
            setSuccess(null);
          }}
        >
          {formOpen ? "Скрыть форму" : "Создать пользователя"}
        </Button>
      </div>

      {formOpen ? (
        <form
          onSubmit={(event) => void handleCreate(event)}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Новый пользователь
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Аккаунт создаётся сразу с подтверждённым email и выбранной ролью
            платформы.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="block text-sm">
              <label
                htmlFor="admin-create-email"
                className="mb-1.5 block font-medium text-slate-700"
              >
                Email
              </label>
              <Input
                id="admin-create-email"
                type="email"
                required
                autoComplete="off"
                value={createForm.email}
                onChange={(event) =>
                  handleCreateFieldChange("email", event.target.value)
                }
                disabled={creating}
              />
            </div>
            <div className="block text-sm">
              <label
                htmlFor="admin-create-password"
                className="mb-1.5 block font-medium text-slate-700"
              >
                Пароль
              </label>
              <Input
                id="admin-create-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={createForm.password}
                onChange={(event) =>
                  handleCreateFieldChange("password", event.target.value)
                }
                disabled={creating}
              />
            </div>
            <div className="block text-sm">
              <label
                htmlFor="admin-create-full-name"
                className="mb-1.5 block font-medium text-slate-700"
              >
                ФИО
              </label>
              <Input
                id="admin-create-full-name"
                required
                value={createForm.full_name}
                onChange={(event) =>
                  handleCreateFieldChange("full_name", event.target.value)
                }
                disabled={creating}
              />
            </div>
            <div className="block text-sm">
              <label
                htmlFor="admin-create-organization"
                className="mb-1.5 block font-medium text-slate-700"
              >
                Организация
              </label>
              <Input
                id="admin-create-organization"
                required
                value={createForm.organization}
                onChange={(event) =>
                  handleCreateFieldChange("organization", event.target.value)
                }
                disabled={creating}
              />
            </div>
            <div className="block text-sm">
              <label
                htmlFor="admin-create-phone"
                className="mb-1.5 block font-medium text-slate-700"
              >
                Телефон
              </label>
              <Input
                id="admin-create-phone"
                required
                value={createForm.phone}
                onChange={(event) =>
                  handleCreateFieldChange("phone", event.target.value)
                }
                disabled={creating}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="block text-sm">
                <label
                  htmlFor="admin-create-role"
                  className="mb-1.5 block font-medium text-slate-700"
                >
                  Роль
                </label>
                <select
                  id="admin-create-role"
                  value={createForm.role}
                  onChange={(event) =>
                    handleCreateFieldChange(
                      "role",
                      event.target.value as AdminUserRole,
                    )
                  }
                  disabled={creating}
                  className="h-11 w-full rounded-xl bg-white px-3 text-sm text-slate-900 ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
                >
                  {ADMIN_USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ADMIN_USER_ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="block text-sm">
                <label
                  htmlFor="admin-create-status"
                  className="mb-1.5 block font-medium text-slate-700"
                >
                  Статус
                </label>
                <select
                  id="admin-create-status"
                  value={createForm.status}
                  onChange={(event) =>
                    handleCreateFieldChange(
                      "status",
                      event.target.value as AdminUserStatus,
                    )
                  }
                  disabled={creating}
                  className="h-11 w-full rounded-xl bg-white px-3 text-sm text-slate-900 ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
                >
                  {ADMIN_USER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {ADMIN_USER_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={creating}
              onClick={() => {
                setFormOpen(false);
                setCreateForm(EMPTY_CREATE_FORM);
              }}
            >
              Отмена
            </Button>
            <Button type="submit" size="sm" disabled={creating}>
              {creating ? "Создание…" : "Создать"}
            </Button>
          </div>
        </form>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
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
            {
              key: "actions",
              header: "",
              className: "text-right",
              render: (user) => {
                const isSelf = currentUser?.id === user.id;
                return (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isSelf || deletingId === user.id}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    aria-label={`Удалить пользователя ${adminUserDisplayName(user)}`}
                    onClick={() => void handleDelete(user)}
                  >
                    {deletingId === user.id ? "Удаление…" : "Удалить"}
                  </Button>
                );
              },
            },
          ]}
        />
      )}
    </>
  );
}
