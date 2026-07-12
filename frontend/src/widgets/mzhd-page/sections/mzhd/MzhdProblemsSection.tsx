"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import { mzhdImages, problemCards } from "@/widgets/mzhd-page";

import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdProblemsSection() {
  return (
    <motion.section className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Почему традиционное управление МЖД не работает
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {problemCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg sm:h-[420px]">
            <Image
              src={mzhdImages.problems}
              alt={mzhdImages.problemsAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
