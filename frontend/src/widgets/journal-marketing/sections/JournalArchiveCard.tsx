"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JournalIssueRecord } from "@/entities/journal-issue";
import {
  formatDate,
  getJournalIssuePath,
  publicAccessBadgeLabels,
} from "@/entities/journal-issue";
import { cn } from "@/shared/lib";
import {
  journalCoverSpine,
  journalStaggerItem,
} from "@/widgets/journal-marketing";

type JournalArchiveCardProps = {
  issue: JournalIssueRecord;
};

function issueYear(iso: string): string {
  if (!iso) return "";
  return new Date(iso).getFullYear().toString();
}

export function JournalArchiveCard({ issue }: JournalArchiveCardProps) {
  const issueHref = getJournalIssuePath(issue.id);
  const isLocked = issue.accessType !== "FREE";
  const spine = journalCoverSpine[issue.issueNumber] ?? "bg-slate-700";
  const year = issueYear(issue.updatedAt);

  return (
    <motion.article variants={journalStaggerItem} className="group min-w-0">
      <Link href={issueHref} className="block min-w-0">
        <div className="relative mx-auto w-full max-w-[220px] sm:max-w-none">
          <div
            className="absolute -bottom-4 left-1/2 h-8 w-[88%] -translate-x-1/2 rounded-[100%] bg-slate-300/60 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />

          <div
            className={cn(
              "absolute -left-1.5 top-1.5 z-0 w-1.5 rounded-l-sm sm:-left-2 sm:w-2",
              spine,
              "bottom-1.5",
            )}
            aria-hidden
          />

          <div className="relative aspect-[3/4] overflow-hidden rounded-r-xl rounded-l-sm border border-slate-200/90 bg-slate-100 shadow-md ring-1 ring-slate-900/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
            {issue.coverUrl ? (
              <Image
                src={issue.coverUrl}
                alt={`Обложка выпуска ${issue.issueNumber} — ${issue.title}`}
                fill
                className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                unoptimized={issue.coverUrl.includes("supabase.co")}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-slate-700 to-slate-900 p-4">
                <span className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                  Выпуск
                </span>
                <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
                  {issue.issueNumber}
                </span>
              </div>
            )}

            {isLocked ? (
              <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-3">
                <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  <Lock className="h-3 w-3" strokeWidth={2} />
                  {publicAccessBadgeLabels[issue.accessType]}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/35 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
                  Читать
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 min-w-0 text-center sm:mt-5 sm:text-left">
          <p className="text-[11px] font-semibold tracking-wider text-sky-700 uppercase">
            Выпуск {issue.issueNumber}
            {year ? ` · ${year}` : ""}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-sora)] text-base font-semibold leading-snug text-slate-900 transition group-hover:text-sky-900 sm:text-[1.05rem]">
            {issue.title}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500">
            {formatDate(issue.updatedAt)}
          </p>
          {issue.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
              {issue.description}
            </p>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
