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
  const hasCover = Boolean(issue.coverUrl);

  return (
    <div className={cn("mx-auto flex w-full flex-col items-center", className)}>
      <div
        className={cn(
          "relative w-full",
          isHero
            ? "max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
            : "max-w-[200px]",
        )}
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative"
          style={{
            transform: "rotateY(-6deg) rotateX(1deg)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{ rotateY: -2, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute -bottom-5 left-1/2 h-10 w-[90%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl"
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
              "relative overflow-hidden rounded-r-2xl rounded-l-sm border border-white/15 bg-slate-900 shadow-[0_28px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/10",
              isHero ? "aspect-[3/4.05]" : "aspect-[3/4]",
            )}
          >
            {hasCover ? (
              <Image
                src={issue.coverUrl}
                alt={`Обложка выпуска ${issue.issueNumber} — ${issue.title}`}
                fill
                className="object-cover object-center"
                sizes={
                  isHero
                    ? "(max-width: 640px) 260px, (max-width: 1024px) 380px, 420px"
                    : "(max-width: 768px) 200px, 220px"
                }
                priority={isHero}
                unoptimized={issue.coverUrl.includes("supabase.co")}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 sm:p-6">
                <p className="text-[10px] font-semibold tracking-[0.24em] text-white/50 uppercase">
                  Выпуск
                </p>
                <div>
                  <p
                    className={cn(
                      "font-[family-name:var(--font-sora)] font-bold tracking-tight text-white",
                      isHero ? "text-3xl sm:text-4xl" : "text-2xl",
                    )}
                  >
                    {issue.issueNumber}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-medium leading-snug text-white/90",
                      isHero ? "text-base sm:text-lg" : "text-sm",
                    )}
                  >
                    {issue.title}
                  </p>
                </div>
              </div>
            )}

            {issue.isLocked ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/55 backdrop-blur-[2px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <Lock
                    className="h-5 w-5 text-white/90 sm:h-6 sm:w-6"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="mt-3 text-xs font-medium text-white/80 sm:text-sm">
                  {issue.category}
                </p>
              </div>
            ) : null}

            {!issue.isLocked && isHero ? (
              <span className="absolute right-3 top-3 rounded-md border border-white/25 bg-black/50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                PDF
              </span>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
