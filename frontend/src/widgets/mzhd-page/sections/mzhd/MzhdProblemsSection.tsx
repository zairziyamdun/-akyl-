"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Container } from "@/shared/ui/Container";

import { mzhdImages, problemCards } from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdProblemsSection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="mzhd-problems-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <motion.div {...sectionMotion}>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
              Проблема
            </p>
            <h2
              id="mzhd-problems-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Почему традиционное управление МЖД не работает
            </h2>

            <motion.ol
              className="mt-10 space-y-0 border-t border-slate-200"
              variants={mzhdStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {problemCards.map((card, index) => (
                <motion.li
                  key={card.title}
                  variants={mzhdStaggerItem}
                  className="grid gap-2 border-b border-slate-200 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span className="font-[family-name:var(--font-sora)] text-xs font-semibold tracking-[0.14em] text-slate-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>

          <motion.div
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={mzhdImages.problems}
              alt={mzhdImages.problemsAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
