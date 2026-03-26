export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="rounded-2xl bg-white/80 px-4 py-4 shadow-sm ring-1 ring-black/5">
          <span className="text-sm text-slate-600">© {year}</span>
        </div>
      </div>
    </footer>
  );
}

