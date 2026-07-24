"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import {
  akimatCapabilities,
  akimatCapabilitiesSection,
} from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatCapabilitiesSection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="akimat-capabilities-heading"
    >
      <Container>
        <motion.div {...akimatSectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            {akimatCapabilitiesSection.eyebrow}
          </p>
          <h2
            id="akimat-capabilities-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {akimatCapabilitiesSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            {akimatCapabilitiesSection.description}
          </p>

          <motion.ul
            className="mt-12 divide-y divide-slate-200 border-y border-slate-200"
            variants={akimatStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {akimatCapabilities.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  variants={akimatStaggerItem}
                  className="grid gap-4 py-6 sm:grid-cols-[2.5rem_1fr_1.2fr] sm:items-start sm:gap-8 sm:py-7"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-slate-900 text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {item.text}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
