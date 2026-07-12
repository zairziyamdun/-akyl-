export function JournalListSkeleton({ count = 6 }: { count?: number }) {
  const placeholders = Array.from(
    { length: count },
    (_, i) => `journal-card-skeleton-${i}`,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {placeholders.map((id) => (
        <div
          key={id}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-40 bg-slate-100" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-20 rounded bg-slate-100" />
            <div className="h-5 w-full rounded bg-slate-100" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-10 w-full rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function JournalTableSkeleton({ rows = 5 }: { rows?: number }) {
  const placeholders = Array.from(
    { length: rows },
    (_, i) => `journal-row-skeleton-${i}`,
  );

  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-11 bg-slate-100" />
      {placeholders.map((id) => (
        <div
          key={id}
          className="flex items-center gap-4 border-t border-slate-100 px-4 py-4"
        >
          <div className="h-14 w-10 rounded bg-slate-100" />
          <div className="h-4 flex-1 rounded bg-slate-100" />
          <div className="h-4 w-16 rounded bg-slate-100" />
          <div className="h-6 w-20 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
