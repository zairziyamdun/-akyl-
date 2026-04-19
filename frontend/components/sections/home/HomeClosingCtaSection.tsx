"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { homeTransition, homeViewport } from "@/lib/homePageMotion";

export function HomeClosingCtaSection() {
  return (
    <section className="bg-slate-950 text-white">
      <Container className="py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={homeViewport}
          transition={homeTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Обсудить методологию и внедрение
          </h2>
          <p className="mt-5 text-base text-slate-400 sm:text-lg">
            Короткая сессия: контекст вашего фонда, зрелость процессов и логичный следующий шаг.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contacts"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 sm:w-auto"
            >
              Запросить консультацию
            </Link>
            <Link
              href="/mzhd"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
            >
              Материалы по управлению МЖД
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
