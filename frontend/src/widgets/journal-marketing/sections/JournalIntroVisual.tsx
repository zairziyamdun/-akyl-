"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

/** Статичная обложка для intro-слайда hero (без данных из БД). */
export function JournalIntroVisual() {
  return (
    <div className="mx-auto flex w-full max-w-[260px] justify-center sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
      <motion.div
        className="group relative aspect-[3/4.05] w-full overflow-hidden rounded-sm border border-white/15 bg-slate-900 ring-1 ring-white/10"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 transition duration-700 group-hover:from-sky-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.22),transparent_55%)] transition duration-700 group-hover:opacity-100" />
        <div
          className="absolute inset-y-0 left-0 w-2 bg-sky-700/80"
          aria-hidden
        />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-sky-300/80 uppercase">
              AKYL Journal
            </p>
            <div className="mt-6 h-px w-12 bg-white/25 transition duration-500 group-hover:w-20 group-hover:bg-sky-300/60" />
          </div>

          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-sky-200 transition duration-500 group-hover:border-sky-300/40 group-hover:bg-sky-400/10 sm:h-14 sm:w-14">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.25} />
            </div>
            <p className="font-[family-name:var(--font-sora)] text-xl font-bold leading-tight text-white sm:text-2xl">
              Экспертные выпуски
            </p>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-white/55 sm:text-sm">
              PDF-издания о профессиональном управлении МЖД
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
