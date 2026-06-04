"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

import { implementationSectionMotion } from "./implementationMotion";

export function ImplementationFinalCta() {
  return (
    <section
      className="py-16 sm:py-20 lg:pb-24"
      style={{ backgroundColor: "#f8f5ef" }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-br from-white via-[#faf8f3] to-[#f0ebe2] px-8 py-12 shadow-[0_24px_80px_rgba(41,37,36,0.1)] sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-stone-200/40 blur-3xl" />

            <div className="relative max-w-3xl">
              <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Начните внедрение профессионального управления МЖД
              </h2>
              <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
                AKYL помогает перейти от разрозненного управления к системе:
                диагностика, процессы, KPI, цифровые инструменты и регулярный
                контроль.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/consultation">Запросить консультацию</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/tools">Перейти к инструментам</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
