"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { authorPage } from "@/data/authorPage";

const { hero } = authorPage;

export function AuthorHeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06] bg-[#060a0f] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,186,122,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5 lg:order-2"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto max-w-[420px] lg:ml-auto lg:mr-0">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#d4ba7a]/20 via-transparent to-transparent opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
                <Image
                  src={hero.portraitSrc}
                  alt={hero.portraitAlt}
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) min(100vw, 420px), 420px"
                  className="h-auto w-full bg-white object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
              Источник методологии
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              {hero.fullName}
            </h1>
            <p className="mt-4 max-w-xl text-lg font-medium leading-snug text-[#d4ba7a]/95 md:text-xl">
              {hero.role}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-[17px] md:leading-8">
              {hero.lead}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-12 rounded-full border-0 bg-[#d4ba7a] px-7 text-sm font-medium text-[#0b1320] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-[#e0ca8a]"
              >
                <Link href="/contacts">Связаться / Консультация</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-full border border-white/12 bg-white/[0.04] px-7 text-sm font-medium text-white shadow-none ring-0 hover:bg-white/[0.08]"
              >
                <Link href="/library/books">Книги автора</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
