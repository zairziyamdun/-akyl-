"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { homeJournalPosts, homeJournalUrl } from "../model/home-journal.data";
import { homeTransition, homeViewport } from "../model/homePageMotion";

const posts = homeJournalPosts;
const JOURNAL_URL = homeJournalUrl;

export function HomeJournalSpotlightSection() {
  return (
    <section className="border-b border-slate-200/80 bg-slate-50">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-8 border-b border-slate-200 pb-10 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Журнал
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Экспертный контур
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Публикации и разборы — живой слой методологии за пределами
              статичных страниц.
            </p>
          </motion.div>
          <Link
            href={JOURNAL_URL}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-sky-800"
          >
            Все материалы
            <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-2 divide-y divide-slate-200">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={homeViewport}
              transition={{ ...homeTransition, delay: i * 0.06 }}
            >
              <Link
                href={JOURNAL_URL}
                className="group grid gap-3 py-6 transition duration-300 hover:bg-white/70 sm:grid-cols-[7.5rem_1fr_auto] sm:items-center sm:gap-8 sm:py-7"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  {p.tag} · {p.date}
                </span>
                <h3 className="text-lg font-semibold leading-snug text-slate-900 transition duration-300 group-hover:text-sky-950">
                  {p.title}
                  <span className="mt-2 block h-px max-w-0 bg-sky-500 transition-all duration-500 group-hover:max-w-[6rem]" />
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition duration-300 group-hover:text-sky-700">
                  Читать
                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
