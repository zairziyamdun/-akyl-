"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { homeTransition, homeViewport } from "../model/homePageMotion";
import {
  homeEducationBlocks,
  homeEducationImage,
} from "../model/home-education.data";

const blocks = homeEducationBlocks;

export function HomeEducationSpotlightSection() {
  return (
    <section className="border-b border-slate-200/80 bg-slate-100/80">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-lg lg:aspect-[5/4]"
          >
            <Image
              src={homeEducationImage.src}
              alt={homeEducationImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={homeViewport}
              transition={homeTransition}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Обучение
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Учиться системе — не пересказывать регламенты
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Образовательный контур закрепляет язык методологии и переводит его в ежедневную
                практику.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4">
              {blocks.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={homeViewport}
                    transition={{ ...homeTransition, delay: i * 0.06 }}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{b.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{b.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={homeViewport}
              transition={{ ...homeTransition, delay: 0.15 }}
              className="mt-10"
            >
              <Link
                href="/education"
                className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Перейти к обучению
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
