export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <nav className="flex items-center justify-between rounded-2xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <a
            href="/"
            aria-label="Home"
            className="flex items-center gap-3 rounded-xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-900/10 to-slate-500/10 ring-1 ring-inset ring-black/5"
            />
          </a>

          <div className="flex items-center gap-2">
            <span className="sr-only">Navigation</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

