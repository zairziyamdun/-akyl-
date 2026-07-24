"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { akimatHero, akimatImages } from "@/widgets/akimat-page";

import {
  akimatHeroTransition,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatHeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[min(92svh,900px)] overflow-hidden text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={akimatImages.hero}
          alt={akimatHero.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(90deg, black 0%, black 45%, transparent 78%)",
        }}
      />

      <Container className="relative z-10 flex min-h-[min(92svh,900px)] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
        <motion.div
          className="max-w-3xl"
          variants={akimatStagger}
          initial={reduced ? "show" : "hidden"}
          animate="show"
        >
          <motion.p
            variants={akimatStaggerItem}
            className="font-[family-name:var(--font-sora)] text-sm font-semibold tracking-[0.28em] text-white/90 uppercase sm:text-base"
          >
            {akimatHero.brand}
            <span className="mx-3 inline-block h-3 w-px bg-white/35 align-middle" />
            <span className="tracking-[0.18em] text-white/65">
              {akimatHero.audience}
            </span>
          </motion.p>

          <motion.h1
            variants={akimatStaggerItem}
            className="mt-5 font-[family-name:var(--font-sora)] text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            {akimatHero.title}
          </motion.h1>

          <motion.p
            variants={akimatStaggerItem}
            className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg"
          >
            {akimatHero.description}
          </motion.p>

          <motion.div
            variants={akimatStaggerItem}
            className="mt-10 flex flex-wrap gap-3"
            transition={akimatHeroTransition}
          >
            <Button
              asChild
              className="h-12 rounded-xl bg-white px-6 text-slate-950 hover:bg-slate-100"
            >
              <Link href="/consultation">{akimatHero.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-12 rounded-xl border-0 bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15"
            >
              <Link href="/mzhd">{akimatHero.secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
