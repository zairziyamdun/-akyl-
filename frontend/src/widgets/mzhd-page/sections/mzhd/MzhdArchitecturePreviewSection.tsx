"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

import {
  architectureLevels,
  architecturePreviewCards,
  mzhdImages,
} from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdArchitecturePreviewSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 py-16 text-white sm:py-20"
      aria-labelledby="mzhd-architecture-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={mzhdImages.architecturePreview}
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/65" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...sectionMotion}>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
              Архитектура
            </p>
            <h2
              id="mzhd-architecture-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Архитектура управления домом
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Профессиональная модель выстраивается по уровням: у каждого — свои
              роли, решения и цифровой контур контроля.
            </p>

            <ul className="mt-8 space-y-0 border-t border-white/15">
              {architectureLevels.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-white/15 py-4 text-sm text-slate-200 sm:text-base"
                >
                  <span className="font-[family-name:var(--font-sora)] text-xs font-semibold tracking-[0.14em] text-slate-500 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                asChild
                className="h-12 rounded-xl bg-white px-6 text-slate-950 hover:bg-slate-100"
              >
                <Link href="/mzhd/architecture">Подробнее об архитектуре</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="space-y-0 border-t border-white/15 lg:border-t-0 lg:border-l lg:border-white/15 lg:pl-12"
            variants={mzhdStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {architecturePreviewCards.map((card) => (
              <motion.article
                key={card.levelLabel}
                variants={mzhdStaggerItem}
                className="border-b border-white/15 py-6"
              >
                <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
                  {card.levelLabel}
                </p>
                <p className="mt-2 text-base font-medium text-slate-100">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
