"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

/** Статичная обложка для intro-слайда hero (без данных из БД). */
export function JournalIntroVisual() {
  return (
    <div className="mx-auto flex w-full max-w-[260px] justify-center sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
      <motion.div
        className="relative aspect-[3/4.05] w-full overflow-hidden rounded-r-2xl rounded-l-sm border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
        style={{ transform: "rotateY(-6deg) rotateX(1deg)" }}
        whileHover={{ rotateY: -2, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 sm:h-20 sm:w-20">
            <BookOpen
              className="h-8 w-8 text-sky-200/90 sm:h-10 sm:w-10"
              strokeWidth={1.25}
            />
          </div>
          <p className="mt-5 font-[family-name:var(--font-sora)] text-xl font-bold text-white sm:mt-6 sm:text-2xl">
            Экспертные выпуски
          </p>
          <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-white/60 sm:text-sm">
            PDF-издания о профессиональном управлении МЖД
          </p>
        </div>
      </motion.div>
    </div>
  );
}
