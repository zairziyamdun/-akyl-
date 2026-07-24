"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";

import { methodologyCards } from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdMethodologySection() {
  return (
    <section
      id="methodology"
      className="scroll-mt-24 border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="mzhd-methodology-heading"
    >
      <Container>
        <motion.div {...sectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            Методология
          </p>
          <h2
            id="mzhd-methodology-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Семь блоков профессионального управления
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Каждый блок раскрывает отдельный контур системы — от теории и
            архитектуры до KPI и стандартов качества.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 divide-y divide-slate-200 border-y border-slate-200"
          variants={mzhdStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {methodologyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.href} variants={mzhdStaggerItem}>
                <Link
                  href={card.href}
                  className="group grid gap-4 py-6 transition-colors hover:bg-slate-50/80 sm:grid-cols-[3rem_2.5rem_1fr_auto] sm:items-center sm:gap-6 sm:py-7"
                >
                  <span className="font-[family-name:var(--font-sora)] text-xs font-semibold tracking-[0.14em] text-slate-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-slate-900 text-white">
                    <Icon size={18} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:underline group-hover:underline-offset-4">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-900 sm:justify-self-end">
                    Подробнее →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
