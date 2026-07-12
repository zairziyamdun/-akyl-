"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";

import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdCtaSection() {
  return (
    <motion.section className="pb-18 pt-14 sm:pb-22 sm:pt-18" {...sectionMotion}>
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-10 lg:p-12">
          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-slate-100 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-52 w-52 rounded-full bg-emerald-100/50 blur-3xl" />
          <div className="relative">
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              Перейдите от хаотичного администрирования к профессиональному
              управлению
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/tools">Открыть инструменты</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/library">Изучить библиотеку</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
