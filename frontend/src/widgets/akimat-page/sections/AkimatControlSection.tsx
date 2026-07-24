"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Container } from "@/shared/ui/Container";
import {
  akimatControlBullets,
  akimatControlSection,
  akimatImages,
} from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatControlSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="akimat-control-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={akimatImages.control}
              alt={akimatControlSection.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-transparent to-transparent" />
          </motion.div>

          <motion.div {...akimatSectionMotion}>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
              {akimatControlSection.eyebrow}
            </p>
            <h2
              id="akimat-control-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              {akimatControlSection.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {akimatControlSection.description}
            </p>

            <motion.ul
              className="mt-8 space-y-0"
              variants={akimatStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {akimatControlBullets.map((line, index) => (
                <motion.li
                  key={line}
                  variants={akimatStaggerItem}
                  className="flex items-start gap-4 border-t border-slate-200 py-4 text-sm text-slate-700 sm:text-base"
                >
                  <span className="font-[family-name:var(--font-sora)] text-xs font-semibold tracking-wider text-slate-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
