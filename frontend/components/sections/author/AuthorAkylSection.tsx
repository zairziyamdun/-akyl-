"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { akyl } = authorPage;

export function AuthorAkylSection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#080d14] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/40">
              {akyl.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {akyl.title}
            </h2>
            <div className="mt-8 space-y-5">
              {akyl.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-7 text-white/60 md:text-[17px] md:leading-8"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 lg:col-span-6"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            {akyl.roles.map((role) => (
              <div
                key={role.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition hover:border-[#d4ba7a]/25 hover:bg-white/[0.03]"
              >
                <div className="text-sm font-semibold text-[#d4ba7a]">{role.label}</div>
                <p className="mt-2 text-sm leading-6 text-white/55">{role.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
