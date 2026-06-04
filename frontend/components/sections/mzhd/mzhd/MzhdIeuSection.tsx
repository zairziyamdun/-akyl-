"use client";

import Link from "next/link";
import { Activity, Network } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ieuRows, ieuSummary } from "@/data/mzhdData";

import { sectionMotion } from "./mzhdMotion";

export function MzhdIeuSection() {
  return (
    <motion.section className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Эффективность должна быть измеримой
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              IEU отражает целостность управления домом: от финансовой устойчивости
              до качества сервисных процессов и прозрачности исполнения.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm">
              <Activity size={16} className="text-emerald-600" />
              {ieuSummary.status}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_56px_rgba(15,23,42,0.1)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">{ieuSummary.scoreLabel}</p>
                <p className="text-4xl font-semibold tracking-tight">
                  {ieuSummary.score}
                </p>
              </div>
              <Network className="text-slate-400" />
            </div>
            <div className="mt-6 space-y-3">
              {ieuRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-medium text-slate-800">{row.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <Button asChild className="w-full">
                <Link href="/tools/index-efficiency">Рассчитать индекс</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
