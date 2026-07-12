"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import {
  heroKpiRows,
  heroManagementIndex,
  mzhdImages,
} from "@/widgets/mzhd-page";

import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdHeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={mzhdImages.hero}
          alt={mzhdImages.heroAlt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/65" />
      </div>

      <Container className="relative py-18 sm:py-20 lg:py-24">
        <motion.div
          className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12"
          {...sectionMotion}
        >
          <div>
            <span className="inline-flex rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-slate-600 uppercase">
              Управление МЖД
            </span>
            <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Управление МЖД как профессиональная система
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
              Методология AKYL объединяет архитектуру управления, роли
              участников, бизнес-процессы, финансы, KPI и цифровые инструменты в
              единую систему управления многоквартирным домом.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#methodology">Изучить методологию</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/tools">Перейти к инструментам</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white/92 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {heroManagementIndex.panelLabel}
              </p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {heroManagementIndex.badge}
              </span>
            </div>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {heroManagementIndex.score}
            </p>
            <div className="mt-6 space-y-4">
              {heroKpiRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-medium text-slate-800">
                      {row.value}%
                    </span>
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
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">
                {heroManagementIndex.contourTitle}
              </p>
              <p className="mt-2">{heroManagementIndex.contourFlow}</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
