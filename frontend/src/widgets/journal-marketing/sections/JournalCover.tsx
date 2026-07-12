"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Image from "next/image";
import type { HeroIssueSlide } from "@/entities/journal-issue";
import { cn } from "@/shared/lib";
import { journalCoverSpine } from "@/widgets/journal-marketing";

type JournalCoverProps = {
  issue: HeroIssueSlide;
  size?: "hero" | "card";
  className?: string;
};

export function JournalCover({
  issue,
  size = "hero",
  className,
}: JournalCoverProps) {
  const spine = journalCoverSpine[issue.issueNumber] ?? "bg-slate-800";
  const isHero = size === "hero";

  return (
    <div className={cn("mx-auto flex w-full flex-col items-center", className)}>
      <div
        className={cn(
          "relative w-full",
          isHero
            ? "max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px]"
            : "max-w-[200px]",
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
            {issue.coverUrl ? (
              <Image
                src={issue.coverUrl}
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
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
            )}

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
                  {issue.issueNumber}
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
                <Lock
                  className="h-8 w-8 text-white/90 sm:h-10 sm:w-10"
                  strokeWidth={1.5}
                />
                <p className="mt-3 text-sm font-semibold text-white">
                  Закрытый выпуск
                </p>
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
    </div>
  );
}
