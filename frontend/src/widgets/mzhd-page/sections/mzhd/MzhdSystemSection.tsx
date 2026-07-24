"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

import { systemBlocks } from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdSystemSection() {
  return (
    <section
      className="border-b border-slate-800 bg-slate-950 py-16 text-white sm:py-20"
      aria-labelledby="mzhd-system-heading"
    >
      <Container>
        <motion.div {...sectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
            Модель
          </p>
          <h2
            id="mzhd-system-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            МЖД — это не просто дом, а управляемая система
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Пять контуров связаны в цикл: объект, участники, процессы, финансы и
            данные формируют основу для контроля и улучшений.
          </p>

          <motion.ol
            className="mt-12 grid gap-px overflow-hidden border border-slate-800 bg-slate-800 sm:grid-cols-2 lg:grid-cols-5"
            variants={mzhdStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {systemBlocks.map((block, index) => (
              <motion.li
                key={block}
                variants={mzhdStaggerItem}
                className="flex flex-col justify-between bg-slate-950 p-5 sm:min-h-[160px] sm:p-6"
              >
                <span className="font-[family-name:var(--font-sora)] text-xs font-semibold tracking-[0.14em] text-slate-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-8 text-sm font-medium leading-6 text-slate-100 sm:mt-auto sm:pt-8">
                  {block}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          <p className="mt-6 text-sm text-slate-500">
            Итог цикла — измеримое качество управления домом как единым
            объектом.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
