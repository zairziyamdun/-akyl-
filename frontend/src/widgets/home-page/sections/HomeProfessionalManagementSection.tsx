"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { homeTransition, homeViewport } from "../model/homePageMotion";
import { homeProfessionalPillars } from "../model/home-professional-management.data";

const pillars = homeProfessionalPillars;

export function HomeProfessionalManagementSection() {
  return (
    <section className="relative border-b border-slate-200/80 bg-white">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Определение
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
              Что такое профессиональное управление МЖД
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Это не набор разрозненных задач, а единая управленческая логика: процессы, роли,
              финансы и показатели связаны между собой.
            </p>
            <Link
              href="/mzhd"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Раздел «Управление МЖД»
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={homeViewport} transition={{ ...homeTransition, delay: i * 0.04 }}>
                  <Link
                    href={p.href}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition duration-300 hover:border-slate-300 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-900" />
                    </div>
                    <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      {p.hint}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">{p.title}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
