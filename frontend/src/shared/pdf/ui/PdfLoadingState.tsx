type PdfLoadingStateProps = {
  message?: string;
  hint?: string;
};

export function PdfLoadingState({
  message = "Загрузка документа…",
  hint = "Это может занять несколько секунд",
}: PdfLoadingStateProps) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-sky-600"
        aria-hidden
      />
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700">{message}</p>
        {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
      </div>
    </div>
  );
}
