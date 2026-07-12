import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className,
}: {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-slate-50/80">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-sm text-slate-700",
                      col.className,
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  const rowIds = Array.from({ length: rows }, (_, i) => `table-skel-row-${i}`);
  const colIds = Array.from({ length: cols }, (_, i) => `table-skel-col-${i}`);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="animate-pulse space-y-0">
        <div className="h-10 bg-slate-100" />
        {rowIds.map((rowId) => (
          <div
            key={rowId}
            className="flex gap-4 border-t border-slate-100 px-4 py-4"
          >
            {colIds.map((colId) => (
              <div
                key={`${rowId}-${colId}`}
                className="h-4 flex-1 rounded bg-slate-100"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
      <div className="h-4 w-24 rounded bg-slate-100" />
      <div className="mt-4 h-8 w-16 rounded bg-slate-100" />
      <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
    </div>
  );
}
