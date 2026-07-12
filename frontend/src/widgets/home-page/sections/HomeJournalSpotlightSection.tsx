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
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
          >
            Все материалы
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
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
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-md"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  {p.tag} · {p.date}
                </span>
                <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug text-slate-900 group-hover:text-slate-700">
                  {p.title}
                </h3>
                <span className="mt-6 text-sm font-medium text-slate-900 opacity-0 transition group-hover:opacity-100">
                  Читать →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
