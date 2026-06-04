"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { methodologyCards } from "@/data/mzhdData";

import { sectionMotion } from "./mzhdMotion";

export function MzhdMethodologySection() {
  return (
    <motion.section id="methodology" className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Методология профессионального управления
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {methodologyCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-slate-100 p-2.5 text-slate-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex text-sm font-medium text-slate-900 underline-offset-4 transition group-hover:underline"
                >
                  Подробнее
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </motion.section>
  );
}
