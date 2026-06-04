"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

import { cn } from "@/lib/cn";
import {
  JOURNAL_ACCESS_HREF,
  journalCoverSpine,
  type JournalIssue,
} from "@/data/journalData";

type JournalCoverProps = {
  issue: JournalIssue;
  size?: "hero" | "card";
  className?: string;
};

export function JournalCover({ issue, size = "hero", className }: JournalCoverProps) {
  const spine = journalCoverSpine[issue.id] ?? "bg-slate-800";
  const isHero = size === "hero";

  const actionClass = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition duration-200",
    isHero
      ? "min-h-[48px] w-full px-6 py-3 text-sm hover:scale-[1.02]"
      : "mt-4 min-h-[40px] w-full px-4 py-2 text-xs",
    issue.isLocked
      ? "border border-white/25 bg-white/10 text-white hover:bg-white/15"
      : "bg-white text-slate-900 hover:bg-slate-100",
  );

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative w-full",
          isHero ? "max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]" : "max-w-[200px]",
        )}
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative"
          style={{
            transform: "rotateY(-8deg) rotateX(2deg)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{ rotateY: -4, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute -bottom-4 left-1/2 h-8 w-[88%] -translate-x-1/2 rounded-[100%] bg-black/40 blur-2xl"
            aria-hidden
          />

          <div
            className={cn(
              "absolute -left-2 top-2 z-0 w-2 rounded-l-sm shadow-lg sm:-left-2.5 sm:w-2.5",
              spine,
              isHero ? "bottom-2" : "bottom-1.5",
            )}
            aria-hidden
          />

          <div
            className={cn(
              "relative overflow-hidden rounded-r-2xl rounded-l-sm border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)]",
              isHero ? "aspect-[3/4.1]" : "aspect-[3/4]",
            )}
          >
            <Image
              src={issue.coverImage}
              alt={issue.title}
              fill
              className="object-cover"
              sizes={
                isHero
                  ? "(max-width: 1024px) 340px, 380px"
                  : "(max-width: 768px) 200px, 220px"
              }
              priority={isHero}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-900/20" />

            <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.28em] text-white/80 uppercase drop-shadow-sm">
                  AKYL Journal
                </p>
                <p
                  className={cn(
                    "mt-4 font-[family-name:var(--font-sora)] font-bold tracking-tight text-white drop-shadow-md",
                    isHero ? "text-3xl sm:text-4xl" : "text-2xl",
                  )}
                >
                  {issue.issue}
                  <span className="text-white/60"> / </span>
                  {issue.year}
                </p>
              </div>

              <div>
                <p
                  className={cn(
                    "font-semibold leading-snug text-white drop-shadow-md",
                    isHero ? "text-lg sm:text-xl" : "text-sm",
                  )}
                >
                  {issue.title}
                </p>
                {!isHero ? (
                  <p className="mt-1 text-xs text-white/80">{issue.category}</p>
                ) : null}
              </div>
            </div>

            {issue.isLocked ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                <Lock className="h-8 w-8 text-white/90 sm:h-10 sm:w-10" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-semibold text-white">Закрытый выпуск</p>
              </div>
            ) : null}

            {!issue.isLocked && isHero ? (
              <span className="absolute right-3 top-3 rounded-md border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                PDF
              </span>
            ) : null}
          </div>
        </motion.div>
      </div>

      {isHero ? (
        <div className="mt-6 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
          {issue.isLocked ? (
            <Link href={JOURNAL_ACCESS_HREF} className={actionClass}>
              Получить доступ
            </Link>
          ) : (
            <a
              href={issue.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              Читать
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
