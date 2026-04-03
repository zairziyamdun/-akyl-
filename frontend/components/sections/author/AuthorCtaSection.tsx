"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { cta } = authorPage;

export function AuthorCtaSection() {
  return (
    <section className="bg-[#040608] py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a1018] px-8 py-12 md:px-12 md:py-16 lg:px-16"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d4ba7a]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/55 md:text-[17px] md:leading-8">
                {cta.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Button
                asChild
                className="h-12 rounded-full border-0 bg-[#d4ba7a] px-8 text-sm font-medium text-[#0b1320] hover:bg-[#e0ca8a]"
              >
                <Link href="/contacts">{cta.primaryLabel}</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-full border border-white/15 bg-white/[0.06] px-8 text-sm font-medium text-white hover:bg-white/[0.1]"
              >
                <Link href="/contacts">{cta.secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
