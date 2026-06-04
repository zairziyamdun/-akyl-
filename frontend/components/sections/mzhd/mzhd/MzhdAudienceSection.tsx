"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { audienceCards } from "@/data/mzhdData";

import { sectionMotion } from "./mzhdMotion";

export function MzhdAudienceSection() {
  return (
    <motion.section className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Для кого создан раздел
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex rounded-xl bg-slate-100 p-2.5 text-slate-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </motion.section>
  );
}
