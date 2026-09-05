"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import {
  homeJournalBridgeContent,
  homeJournalBridgeTopics,
} from "../model/home-journal-bridge.data";
import { homeTransition, homeViewport } from "../model/homePageMotion";

const content = homeJournalBridgeContent;
const topics = homeJournalBridgeTopics;

export function HomeJournalBridgeSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(56,189,248,0.14),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(14,165,233,0.08),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
        aria-hidden
      />

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={homeViewport}
              transition={homeTransition}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/90">
                <Newspaper className="h-3.5 w-3.5" strokeWidth={1.75} />
                {content.eyebrow}
              </span>
              <h2 className="mt-5 max-w-xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {content.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
                {content.description}
              </p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={homeViewport}
              transition={{ ...homeTransition, delay: 0.1 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href={content.ctaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-sky-50 hover:pr-7"
              >
                {content.ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href={content.secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/35 hover:bg-white/10"
              >
                {content.secondaryLabel}
              </Link>
            </motion.div>
          </div>

          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={homeViewport}
            transition={{ ...homeTransition, delay: 0.08 }}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {topics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.li
                  key={topic.title}
                  initial={reduced ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={homeViewport}
                  transition={{ ...homeTransition, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    href={content.ctaHref}
                    className="group flex items-center gap-4 py-4 transition duration-300 hover:bg-white/[0.03] sm:gap-5 sm:py-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sky-300 transition duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-400/10 group-hover:text-sky-200">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white transition duration-300 group-hover:text-sky-100">
                        {topic.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-white/45 transition duration-300 group-hover:text-white/60">
                        {topic.text}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
