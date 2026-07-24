"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import {
  akimatChallenges,
  akimatChallengesSection,
} from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatChallengesSection() {
  return (
    <section
      className="border-b border-slate-800 bg-slate-950 py-16 text-white sm:py-20"
      aria-labelledby="akimat-challenges-heading"
    >
      <Container>
        <motion.div {...akimatSectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
            {akimatChallengesSection.eyebrow}
          </p>
          <h2
            id="akimat-challenges-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {akimatChallengesSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            {akimatChallengesSection.description}
          </p>

          <motion.div
            className="mt-12 grid gap-px overflow-hidden border border-slate-800 bg-slate-800 sm:grid-cols-2"
            variants={akimatStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {akimatChallenges.map((item, index) => (
              <motion.article
                key={item.title}
                variants={akimatStaggerItem}
                className="bg-slate-950 p-6 sm:p-8"
              >
                <span className="font-[family-name:var(--font-sora)] text-xs font-medium tracking-[0.16em] text-slate-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
