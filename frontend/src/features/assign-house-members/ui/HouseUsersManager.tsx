"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HOUSE_USER_ROLE_LABELS,
  HOUSE_USER_ROLES,
  type HouseUserRole,
  type HouseUserWithProfile,
  houseUserDisplayName,
} from "@/entities/house";
import {
  assignHouseUser,
  fetchHouseUsers,
  HouseUsersApiError,
  removeHouseUser,
} from "@/entities/house-member";
import type { AkylRole } from "@/entities/session";
import type { AdminUser } from "@/entities/user";
import { AdminUsersApiError, getAdminUsers } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { DataTable, RoleBadge } from "@/widgets/dashboard-shell";

type HouseUsersManagerProps = {
  houseId: string;
};

function isAkylRole(value: string): value is AkylRole {
  return (
    value === "admin" ||
    value === "manager" ||
    value === "journalist" ||
    value === "user"
  );
}

export function HouseUsersManager({ houseId }: HouseUsersManagerProps) {
  const [houseUsers, setHouseUsers] = useState<HouseUserWithProfile[]>([]);
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedHouseRole, setSelectedHouseRole] =
    useState<HouseUserRole>("manager");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [users, profiles] = await Promise.all([
        fetchHouseUsers(houseId),
        getAdminUsers(),
      ]);
      setHouseUsers(users);
      setAllUsers(profiles);
    } catch (err) {
      const message =
        err instanceof HouseUsersApiError || err instanceof AdminUsersApiError
          ? err.message
          : "Не удалось загрузить пользователей ЖК";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const availableUsers = useMemo(() => {
    const assignedKeys = new Set(
      houseUsers.map((user) => `${user.user_id}:${user.house_role}`),
    );
    return allUsers.filter(
      (user) => !assignedKeys.has(`${user.id}:${selectedHouseRole}`),
    );
  }, [allUsers, houseUsers, selectedHouseRole]);

  const handleAssign = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedUserId) return;

    setAssigning(true);
    setError("");

    try {
      const assigned = await assignHouseUser(houseId, {
        userId: selectedUserId,
        houseRole: selectedHouseRole,
      });
      setHouseUsers((prev) => [assigned, ...prev]);
      setSelectedUserId("");
      setSelectedHouseRole("manager");
    } catch (err) {
      setError(
        err instanceof HouseUsersApiError
          ? err.message
          : "Не удалось назначить пользователя",
      );
    } finally {
      setAssigning(false);
    }
  };

  const handleRemove = async (userId: string) => {
    if (!window.confirm("Удалить пользователя из этого ЖК?")) return;

    setAssigning(true);
    setError("");

    try {
      await removeHouseUser(houseId, userId);
      setHouseUsers((prev) => prev.filter((user) => user.user_id !== userId));
    } catch (err) {
      setError(
        err instanceof HouseUsersApiError
          ? err.message
          : "Не удалось удалить пользователя",
      );
    } finally {
      setAssigning(false);
    }
  };

  return (
    <section className="mt-8 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Пользователи ЖК
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Назначение manager и других ролей для доступа к дому
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={(event) => void handleAssign(event)}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h3 className="text-sm font-semibold text-slate-900">
          Назначить пользователя
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Пользователь
            </label>
            <select
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              required
              disabled={assigning || loading || availableUsers.length === 0}
            >
              <option value="">
                {availableUsers.length === 0
                  ? "Нет доступных пользователей"
                  : "Выберите пользователя"}
              </option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {(user.full_name?.trim() || user.email || user.id) +
                    (user.email ? ` (${user.email})` : "")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Роль в ЖК
            </label>
            <select
              value={selectedHouseRole}
              onChange={(event) =>
                setSelectedHouseRole(event.target.value as HouseUserRole)
              }
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              disabled={assigning}
            >
              {HOUSE_USER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {HOUSE_USER_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={assigning || loading || !selectedUserId}
            >
              {assigning ? "Назначение…" : "Назначить"}
            </Button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          Загрузка пользователей…
        </div>
      ) : houseUsers.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          К этому ЖК пока не назначены пользователи
        </div>
      ) : (
        <DataTable
          data={houseUsers}
          keyExtractor={(user) => user.id}
          columns={[
            {
              key: "name",
              header: "Имя",
              render: (user) => houseUserDisplayName(user),
            },
            {
              key: "email",
              header: "Email",
              render: (user) => user.email ?? "—",
            },
            {
              key: "profile_role",
              header: "Роль платформы",
              render: (user) =>
                isAkylRole(user.role) ? (
                  <RoleBadge role={user.role} />
                ) : (
                  user.role || "—"
                ),
            },
            {
              key: "house_role",
              header: "Роль в ЖК",
              render: (user) => HOUSE_USER_ROLE_LABELS[user.house_role],
            },
            {
              key: "actions",
              header: "",
              className: "text-right",
              render: (user) => (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={assigning}
                  onClick={() => void handleRemove(user.user_id)}
                >
                  Удалить
                </Button>
              ),
            },
          ]}
        />
      )}
    </section>
  );
}
