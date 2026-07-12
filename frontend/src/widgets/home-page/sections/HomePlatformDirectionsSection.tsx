"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { homePlatformDirections } from "../model/home-platform-directions.data";
import { homeTransition, homeViewport } from "../model/homePageMotion";

const directions = homePlatformDirections;

export function HomePlatformDirectionsSection() {
  return (
    <section className="relative border-b border-slate-800/60 bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />
      <Container className="relative py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={homeViewport}
          transition={homeTransition}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Навигация
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
            Направления платформы
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Точки входа в методологию, данные и практику — каждая ведёт в свой
            контур работы.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {directions.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={homeViewport}
                transition={{ ...homeTransition, delay: i * 0.05 }}
              >
                <Link
                  href={d.href}
                  className="group flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] md:min-h-[220px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition group-hover:bg-white/15">
                      <Icon className="h-6 w-6" strokeWidth={1.4} />
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {d.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
