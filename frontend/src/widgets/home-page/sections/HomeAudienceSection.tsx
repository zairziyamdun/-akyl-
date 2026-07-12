"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { homeAudiences } from "../model/home-audience.data";
import { homeTransition, homeViewport } from "../model/homePageMotion";

const audiences = homeAudiences;

export function HomeAudienceSection() {
  return (
    <section className="border-b border-slate-200/80 bg-slate-50">
      <Container className="py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={homeViewport}
          transition={homeTransition}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Аудитория
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
            Для кого эта система
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Одна методология — разные точки приложения. Выберите контур, который
            ближе к вашей роли.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={homeViewport}
                transition={{ ...homeTransition, delay: i * 0.05 }}
              >
                <Link
                  href={a.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {a.text}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100">
                    Перейти →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
