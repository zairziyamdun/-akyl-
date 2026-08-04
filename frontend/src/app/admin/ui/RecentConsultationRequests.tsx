"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type ConsultationRequest,
  ConsultationApiError,
  formatConsultationDate,
  isConsultationStatus,
  listConsultationRequests,
} from "@/entities/consultation-request";
import { Button } from "@/shared/ui/Button";
import { DataTable, StatusBadge } from "@/widgets/dashboard-shell";

export function RecentConsultationRequests() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await listConsultationRequests();
        if (!cancelled) setRequests(data.slice(0, 5));
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ConsultationApiError
              ? err.message
              : "Не удалось загрузить заявки",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
          Последние заявки
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/requests">Все заявки</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Загрузка…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-sm text-slate-500">Заявок пока нет</p>
      ) : (
        <DataTable
          data={requests}
          keyExtractor={(r) => r.id}
          columns={[
            { key: "name", header: "Имя", render: (r) => r.name },
            {
              key: "org",
              header: "Организация",
              render: (r) => r.organization ?? "—",
            },
            {
              key: "status",
              header: "Статус",
              render: (r) =>
                isConsultationStatus(r.status) ? (
                  <StatusBadge status={r.status} />
                ) : (
                  <StatusBadge status="pending" label={r.status} />
                ),
            },
            {
              key: "date",
              header: "Дата",
              render: (r) => formatConsultationDate(r.created_at),
            },
          ]}
        />
      )}
    </div>
  );
}
