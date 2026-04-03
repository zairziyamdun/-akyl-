"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { methodology } = authorPage;

export function AuthorMethodologySection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#080d14] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/40">
              {methodology.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {methodology.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60 md:text-[17px] md:leading-8">
              {methodology.lead}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          >
            <div
              className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10"
              role="img"
              aria-label={methodology.diagramCaption}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-3">
                {methodology.blocks.map((block, index) => (
                  <Fragment key={block.title}>
                    <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.08] bg-[#060a0f]/90 px-5 py-6">
                      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d4ba7a]/85">
                        {block.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/55">{block.text}</p>
                    </div>
                    {index < methodology.blocks.length - 1 ? (
                      <div
                        className="flex shrink-0 items-center justify-center py-1 md:py-0"
                        aria-hidden
                      >
                        <ArrowRight className="h-5 w-5 rotate-90 text-white/25 md:rotate-0" />
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </div>
              <p className="mt-8 text-xs leading-5 text-white/35">
                {methodology.diagramCaption}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
