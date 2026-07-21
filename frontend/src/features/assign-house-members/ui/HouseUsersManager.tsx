"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HOUSE_MEMBERSHIP_STATUS_LABELS,
  HOUSE_MEMBERSHIP_STATUSES,
  HOUSE_USER_ROLE_LABELS,
  HOUSE_USER_ROLES,
  type HouseMembershipStatus,
  type HouseUserRole,
  type HouseUserWithProfile,
  houseUserDisplayName,
} from "@/entities/house";
import {
  assignHouseUser,
  fetchHouseUsers,
  HouseUsersApiError,
  removeHouseUser,
  updateHouseUser,
} from "@/entities/house-member";
import type { PlatformRole } from "@/entities/session";
import type { AdminUser } from "@/entities/user";
import { AdminUsersApiError, getAdminUsers } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { DataTable, RoleBadge } from "@/widgets/dashboard-shell";

type HouseUsersManagerProps = {
  houseId: string;
};

function isPlatformRole(value: string): value is PlatformRole {
  return value === "admin" || value === "journalist" || value === "user";
}

export function HouseUsersManager({ houseId }: HouseUsersManagerProps) {
  const [houseUsers, setHouseUsers] = useState<HouseUserWithProfile[]>([]);
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedHouseRole, setSelectedHouseRole] =
    useState<HouseUserRole>("manager");
  const [selectedStatus, setSelectedStatus] =
    useState<HouseMembershipStatus>("active");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
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
    const assignedIds = new Set(houseUsers.map((user) => user.user_id));
    return allUsers.filter((user) => !assignedIds.has(user.id));
  }, [allUsers, houseUsers]);

  const handleAssign = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedUserId) return;

    setAssigning(true);
    setError("");

    try {
      const assigned = await assignHouseUser(houseId, {
        userId: selectedUserId,
        houseRole: selectedHouseRole,
        status: selectedStatus,
      });
      setHouseUsers((prev) => {
        const without = prev.filter((u) => u.user_id !== assigned.user_id);
        return [assigned, ...without];
      });
      setSelectedUserId("");
      setSelectedHouseRole("manager");
      setSelectedStatus("active");
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

  const handleUpdateMembership = async (
    userId: string,
    patch: { houseRole?: HouseUserRole; status?: HouseMembershipStatus },
  ) => {
    setUpdatingUserId(userId);
    setError("");

    try {
      const updated = await updateHouseUser(houseId, userId, patch);
      setHouseUsers((prev) =>
        prev.map((user) => (user.user_id === userId ? updated : user)),
      );
    } catch (err) {
      setError(
        err instanceof HouseUsersApiError
          ? err.message
          : "Не удалось обновить назначение",
      );
    } finally {
      setUpdatingUserId(null);
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

  const busy = assigning || updatingUserId !== null;

  return (
    <section className="mt-8 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Пользователи ЖК
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Назначение ролей ЖК (membership) для доступа к дому
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
        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_180px_160px_auto]">
          <div>
            <label
              htmlFor="house-user-select"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Пользователь
            </label>
            <select
              id="house-user-select"
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              required
              disabled={busy || loading || availableUsers.length === 0}
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
            <label
              htmlFor="house-user-role"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Роль в ЖК
            </label>
            <select
              id="house-user-role"
              value={selectedHouseRole}
              onChange={(event) =>
                setSelectedHouseRole(event.target.value as HouseUserRole)
              }
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              disabled={busy}
            >
              {HOUSE_USER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {HOUSE_USER_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="house-user-status"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Статус
            </label>
            <select
              id="house-user-status"
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value as HouseMembershipStatus)
              }
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              disabled={busy}
            >
              {HOUSE_MEMBERSHIP_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {HOUSE_MEMBERSHIP_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={busy || loading || !selectedUserId}
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
                isPlatformRole(user.role) ? (
                  <RoleBadge role={user.role} />
                ) : (
                  user.role || "—"
                ),
            },
            {
              key: "house_role",
              header: "Роль в ЖК",
              render: (user) => (
                <select
                  aria-label={`Роль в ЖК: ${houseUserDisplayName(user)}`}
                  value={user.house_role}
                  disabled={busy}
                  onChange={(event) => {
                    const nextRole = event.target.value as HouseUserRole;
                    if (nextRole === user.house_role) return;
                    void handleUpdateMembership(user.user_id, {
                      houseRole: nextRole,
                    });
                  }}
                  className="w-full min-w-[140px] rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 disabled:opacity-60"
                >
                  {HOUSE_USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {HOUSE_USER_ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              key: "status",
              header: "Статус",
              render: (user) => (
                <select
                  aria-label={`Статус: ${houseUserDisplayName(user)}`}
                  value={user.status}
                  disabled={busy}
                  onChange={(event) => {
                    const nextStatus = event.target
                      .value as HouseMembershipStatus;
                    if (nextStatus === user.status) return;
                    void handleUpdateMembership(user.user_id, {
                      status: nextStatus,
                    });
                  }}
                  className="w-full min-w-[120px] rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 disabled:opacity-60"
                >
                  {HOUSE_MEMBERSHIP_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {HOUSE_MEMBERSHIP_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              ),
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
                  disabled={busy}
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
