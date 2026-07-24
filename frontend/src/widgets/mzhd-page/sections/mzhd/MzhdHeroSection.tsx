"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

import { mzhdHero, mzhdImages } from "../../model/mzhd.data";
import { mzhdStagger, mzhdStaggerItem } from "../../model/mzhdMotion";

export function MzhdHeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[min(88svh,860px)] overflow-hidden text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={mzhdImages.hero}
          alt={mzhdImages.heroAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/35" />

      <Container className="relative z-10 flex min-h-[min(88svh,860px)] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
        <motion.div
          className="max-w-3xl"
          variants={mzhdStagger}
          initial={reduced ? "show" : "hidden"}
          animate="show"
        >
          <motion.p
            variants={mzhdStaggerItem}
            className="font-[family-name:var(--font-sora)] text-sm font-semibold tracking-[0.28em] text-white/90 uppercase sm:text-base"
          >
            {mzhdHero.brand}
            <span className="mx-3 inline-block h-3 w-px bg-white/35 align-middle" />
            <span className="tracking-[0.18em] text-white/65">
              {mzhdHero.audience}
            </span>
          </motion.p>

          <motion.h1
            variants={mzhdStaggerItem}
            className="mt-5 font-[family-name:var(--font-sora)] text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {mzhdHero.title}
          </motion.h1>

          <motion.p
            variants={mzhdStaggerItem}
            className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg"
          >
            {mzhdHero.description}
          </motion.p>

          <motion.div
            variants={mzhdStaggerItem}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button
              asChild
              className="h-12 rounded-xl bg-white px-6 text-slate-950 hover:bg-slate-100"
            >
              <Link href="#methodology">{mzhdHero.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-12 rounded-xl border-0 bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15"
            >
              <Link href="/tools">{mzhdHero.secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
