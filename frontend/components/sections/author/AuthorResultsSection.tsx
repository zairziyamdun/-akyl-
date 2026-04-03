"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { results } = authorPage;

export function AuthorResultsSection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#060a0f] py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#d4ba7a]/80">
            {results.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            {results.title}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {results.metrics.map((m, i) => (
            <motion.div
              key={m.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.06,
              }}
              className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-8 transition hover:border-white/[0.11]"
            >
              <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {m.value}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/50">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
