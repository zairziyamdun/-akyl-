"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import { akimatDefinition } from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatDefinitionSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="akimat-definition-heading"
    >
      <Container>
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
          {...akimatSectionMotion}
        >
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
              {akimatDefinition.eyebrow}
            </p>
            <h2
              id="akimat-definition-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              {akimatDefinition.title}
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              {akimatDefinition.text}
            </p>
            <motion.ul
              className="mt-8 space-y-0 border-t border-slate-200"
              variants={akimatStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {akimatDefinition.points.map((point) => (
                <motion.li
                  key={point}
                  variants={akimatStaggerItem}
                  className="flex gap-4 border-b border-slate-200 py-4 text-sm leading-7 text-slate-700 sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"
                    aria-hidden
                  />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
