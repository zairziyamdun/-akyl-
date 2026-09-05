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
            className={cn(
              "absolute inset-y-1.5 left-0 z-0 w-1.5 rounded-l-sm sm:w-2",
              spine,
            )}
            aria-hidden
          />

          <div className="relative ml-1 aspect-[3/4] overflow-hidden rounded-sm border border-slate-200/90 bg-slate-100 ring-1 ring-slate-900/5 transition duration-500 group-hover:-translate-y-1.5 group-hover:border-sky-300/50 group-hover:ring-sky-400/20 sm:ml-1.5">
            {issue.coverUrl ? (
              <Image
                src={issue.coverUrl}
                alt={`Обложка выпуска ${issue.issueNumber} — ${issue.title}`}
                fill
                className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
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

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
              aria-hidden
            />

            {isLocked ? (
              <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-3">
                <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  <Lock className="h-3 w-3" strokeWidth={2} />
                  {publicAccessBadgeLabels[issue.accessType]}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-end justify-start p-3 opacity-0 transition duration-400 group-hover:opacity-100">
                <span className="inline-flex translate-y-2 items-center gap-1.5 border border-white/20 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 transition duration-400 group-hover:translate-y-0 sm:text-sm">
                  Читать
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 min-w-0 border-t border-transparent pt-4 transition duration-300 group-hover:border-slate-200 sm:mt-5">
          <p className="text-[11px] font-semibold tracking-wider text-sky-700 uppercase">
            Выпуск {issue.issueNumber}
            {year ? ` · ${year}` : ""}
          </p>
          <h3 className="mt-1.5 font-[family-name:var(--font-sora)] text-base font-semibold leading-snug text-slate-900 transition duration-300 group-hover:text-sky-950 sm:text-[1.05rem]">
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
