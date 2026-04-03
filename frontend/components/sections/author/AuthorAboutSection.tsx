"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { about } = authorPage;

export function AuthorAboutSection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#080d14] py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-4xl lg:text-left"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/40">
            {about.eyebrow}
          </p>
          <div className="mt-10 space-y-6 text-left">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[17px] leading-[1.75] text-white/70 md:text-lg md:leading-8"
              >
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
