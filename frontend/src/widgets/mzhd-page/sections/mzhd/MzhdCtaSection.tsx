"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

import { mzhdCta } from "../../model/mzhd.data";
import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdCtaSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:pb-24"
      aria-labelledby="mzhd-cta-heading"
    >
      <Container>
        <motion.div
          className="relative overflow-hidden bg-slate-950 px-8 py-14 text-white sm:px-12 sm:py-16 lg:px-16"
          {...sectionMotion}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden
            style={{
              backgroundImage: `
                linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-800/40 to-transparent" />

          <div className="relative max-w-3xl">
            <p className="font-[family-name:var(--font-sora)] text-sm font-semibold tracking-[0.28em] text-white/70 uppercase">
              {mzhdCta.brand}
            </p>
            <h2
              id="mzhd-cta-heading"
              className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {mzhdCta.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
              {mzhdCta.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-xl bg-white px-6 text-slate-950 hover:bg-slate-100"
              >
                <Link href="/tools">{mzhdCta.primaryCta}</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-xl border-0 bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15"
              >
                <Link href="/library">{mzhdCta.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
