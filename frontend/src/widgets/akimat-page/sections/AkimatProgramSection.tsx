"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Container } from "@/shared/ui/Container";
import {
  akimatImages,
  akimatProgramSection,
  akimatProgramSteps,
} from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatProgramSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 py-16 text-white sm:py-20"
      aria-labelledby="akimat-program-heading"
    >
      <div className="absolute inset-0 opacity-30">
        <Image
          src={akimatImages.program}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
      </div>

      <Container className="relative">
        <motion.div {...akimatSectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
            {akimatProgramSection.eyebrow}
          </p>
          <h2
            id="akimat-program-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {akimatProgramSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            {akimatProgramSection.description}
          </p>

          <motion.ol
            className="mt-12 grid gap-0 border-t border-white/15 lg:grid-cols-4"
            variants={akimatStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {akimatProgramSteps.map((step) => (
              <motion.li
                key={step.number}
                variants={akimatStaggerItem}
                className="border-b border-white/15 py-7 lg:border-b-0 lg:border-r lg:border-white/15 lg:px-6 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-[family-name:var(--font-sora)] text-sm font-semibold tracking-[0.14em] text-slate-500 tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.text}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-slate-200">
                  {step.result}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </Container>
    </section>
  );
}
