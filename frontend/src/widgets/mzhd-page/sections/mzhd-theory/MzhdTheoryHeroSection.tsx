"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import {
  mzhdTheoryHero,
  mzhdTheoryImages,
  sectionMotion,
} from "@/widgets/mzhd-page";

export function MzhdTheoryHeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80">
      <div className="absolute inset-0">
        <Image
          src={mzhdTheoryImages.hero}
          alt={mzhdTheoryHero.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/78" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/92 to-sky-50/80" />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
          {...sectionMotion}
        >
          <div>
            <span className="inline-flex rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase">
              {mzhdTheoryHero.badge}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-sora)] text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              {mzhdTheoryHero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              {mzhdTheoryHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#principles">Ключевые принципы</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/tools">Инструменты AKYL</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur sm:p-8">
            <p className="text-sm font-medium text-slate-500">
              {mzhdTheoryHero.panelLabel}
            </p>
            <ul className="mt-5 space-y-4">
              {mzhdTheoryHero.panelItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                  <span className="text-right text-sm text-slate-500">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
