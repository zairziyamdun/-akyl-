"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

/** Static branded visual for the intro hero slide (no DB data). */
export function JournalIntroVisual() {
  return (
    <div className="flex w-full max-w-[300px] justify-center sm:max-w-[340px] lg:max-w-[380px]">
      <motion.div
        className="relative aspect-[3/4.1] w-full overflow-hidden rounded-r-2xl rounded-l-sm border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
        style={{ transform: "rotateY(-8deg) rotateX(2deg)" }}
        whileHover={{ rotateY: -4, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
          <BookOpen className="h-14 w-14 text-sky-300/80" strokeWidth={1.25} />
          <p className="mt-6 text-[10px] font-semibold tracking-[0.28em] text-white/70 uppercase">
            AKYL Journal
          </p>
          <p className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
            Экспертные выпуски
          </p>
          <p className="mt-2 text-sm text-white/60">
            PDF-издания о профессиональном управлении МЖД
          </p>
        </div>
      </motion.div>
    </div>
  );
}
