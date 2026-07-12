"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

/** Static branded visual for the intro hero slide (no DB data). */
export function JournalIntroVisual() {
  return (
    <div className="mx-auto flex w-full max-w-[220px] justify-center sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px]">
      <motion.div
        className="relative aspect-[3/4.1] w-full overflow-hidden rounded-r-2xl rounded-l-sm border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
        style={{ transform: "rotateY(-8deg) rotateX(2deg)" }}
        whileHover={{ rotateY: -4, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center sm:p-8">
          <BookOpen className="h-11 w-11 text-sky-300/80 sm:h-14 sm:w-14" strokeWidth={1.25} />
          <p className="mt-4 text-[10px] font-semibold tracking-[0.28em] text-white/70 uppercase sm:mt-6">
            AKYL Journal
          </p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-xl font-bold text-white sm:mt-3 sm:text-2xl">
            Экспертные выпуски
          </p>
          <p className="mt-2 text-xs text-white/60 sm:text-sm">
            PDF-издания о профессиональном управлении МЖД
          </p>
        </div>
      </motion.div>
    </div>
  );
}
