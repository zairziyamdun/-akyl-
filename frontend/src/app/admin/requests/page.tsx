"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type ConsultationRequest,
  type ConsultationStatus,
  ConsultationApiError,
  CONSULTATION_STATUS_LABELS,
  CONSULTATION_STATUSES,
  formatConsultationDate,
  isConsultationStatus,
  listConsultationRequests,
  updateConsultationRequestStatus,
} from "@/entities/consultation-request";
import { DataTable, PageHeader, StatusBadge } from "@/widgets/dashboard-shell";

type StatusFilter = ConsultationStatus | "all";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listConsultationRequests();
      setRequests(data);
    } catch (err) {
      setError(
        err instanceof ConsultationApiError
          ? err.message
          : "Не удалось загрузить заявки",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  const filtered = useMemo(
    () =>
      statusFilter === "all"
        ? requests
        : requests.filter((r) => r.status === statusFilter),
    [requests, statusFilter],
  );

  const handleStatusChange = async (
    id: string,
    status: ConsultationStatus,
  ) => {
    setUpdatingId(id);
    setError(null);
    try {
      const updated = await updateConsultationRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
    } catch (err) {
      setError(
        err instanceof ConsultationApiError
          ? err.message
          : "Не удалось обновить статус",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Заявки консультаций"
        description="Входящие обращения с формы консультации на сайте"
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="text-sm text-slate-600" htmlFor="status-filter">
          Статус
        </label>
        <select
          id="status-filter"
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Все</option>
          {CONSULTATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {CONSULTATION_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void loadRequests()}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Обновить
        </button>
      </div>

      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-500">Загрузка заявок…</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Заявок пока нет
        </p>
      ) : (
        <DataTable
          data={filtered}
          keyExtractor={(r) => r.id}
          columns={[
            { key: "name", header: "Имя", render: (r) => r.name },
            {
              key: "organization",
              header: "Организация",
              render: (r) => r.organization ?? "—",
            },
            {
              key: "role",
              header: "Роль",
              render: (r) => r.role ?? "—",
            },
            {
              key: "contacts",
              header: "Контакты",
              render: (r) => (
                <div className="text-sm">
                  <p>{r.email ?? "—"}</p>
                  <p className="text-slate-500">{r.phone ?? ""}</p>
                </div>
              ),
            },
            {
              key: "status",
              header: "Статус",
              render: (r) => (
                <div className="flex flex-col gap-1.5">
                  {isConsultationStatus(r.status) ? (
                    <StatusBadge status={r.status} />
                  ) : (
                    <StatusBadge status="pending" label={r.status} />
                  )}
                  <select
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                    value={
                      isConsultationStatus(r.status) ? r.status : "new"
                    }
                    disabled={updatingId === r.id}
                    onChange={(e) =>
                      void handleStatusChange(
                        r.id,
                        e.target.value as ConsultationStatus,
                      )
                    }
                  >
                    {CONSULTATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {CONSULTATION_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>
              ),
            },
            {
              key: "date",
              header: "Дата",
              render: (r) => formatConsultationDate(r.created_at),
            },
            {
              key: "message",
              header: "Сообщение",
              render: (r) => (
                <span
                  className="line-clamp-2 max-w-xs text-slate-500"
                  title={r.message ?? undefined}
                >
                  {r.message ?? "—"}
                </span>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
