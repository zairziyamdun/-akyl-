"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import {
  architectureLevels,
  architecturePreviewCards,
  mzhdImages,
} from "@/widgets/mzhd-page";

import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdArchitecturePreviewSection() {
  return (
    <motion.section className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-2 lg:p-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Архитектура управления домом
            </h2>
            <p className="mt-4 text-slate-600">
              Профессиональная модель управления выстраивается по уровням,
              где каждый уровень имеет свои роли, решения и цифровой контур контроля.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {architectureLevels.map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <Image
              src={mzhdImages.architecturePreview}
              alt={mzhdImages.architecturePreviewAlt}
              fill
              className="object-cover opacity-18"
            />
            <div className="relative space-y-3">
              {architecturePreviewCards.map((card) => (
                <div
                  key={card.levelLabel}
                  className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {card.levelLabel}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
