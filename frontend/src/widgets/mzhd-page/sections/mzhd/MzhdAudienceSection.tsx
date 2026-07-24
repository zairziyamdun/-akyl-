"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";

import { audienceCards } from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdAudienceSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="mzhd-audience-heading"
    >
      <Container>
        <motion.div {...sectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            Аудитория
          </p>
          <h2
            id="mzhd-audience-heading"
            className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Для кого создан раздел
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-10 border-t border-slate-200 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200"
          variants={mzhdStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {audienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={mzhdStaggerItem}
                className="md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <Icon
                  className="text-slate-900"
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Перейти →
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
