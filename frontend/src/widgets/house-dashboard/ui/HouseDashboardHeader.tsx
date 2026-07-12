"use client";

import { FileDown, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";

type HouseDashboardHeaderProps = {
  houseName: string;
  address: string | null;
  period: string;
  backHref: string;
  refreshing: boolean;
  onRefresh: () => void;
};

export function HouseDashboardHeader({
  houseName,
  address,
  period,
  backHref,
  refreshing,
  onRefresh,
}: HouseDashboardHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white px-1 pb-4 pt-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            href={backHref}
            className="mb-2 inline-block text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            ← К списку ЖК
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-lg font-bold text-slate-900 md:text-xl">
              {houseName}
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {period}
            </span>
          </div>
          {address ? (
            <p className="mt-1 truncate text-sm text-slate-500">{address}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              window.alert("Экспорт PDF будет доступен в следующей версии")
            }
          >
            <FileDown className="mr-1.5 h-4 w-4" />
            Экспорт PDF
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={refreshing}
            onClick={onRefresh}
          >
            <RefreshCw
              className={
                refreshing ? "mr-1.5 h-4 w-4 animate-spin" : "mr-1.5 h-4 w-4"
              }
            />
            Обновить
          </Button>
        </div>
      </div>
    </header>
  );
}
