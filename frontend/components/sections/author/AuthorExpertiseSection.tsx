"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { expertise } = authorPage;

export function AuthorExpertiseSection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#060a0f] py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#d4ba7a]/80">
            {expertise.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            {expertise.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/55 md:text-[17px] md:leading-8">
            {expertise.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {expertise.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.035]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold text-[#d4ba7a]/90 ring-1 ring-white/[0.08] transition group-hover:bg-[#d4ba7a]/10 group-hover:ring-[#d4ba7a]/25">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
