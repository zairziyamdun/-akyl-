"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";
import {
  mzhdTheoryImages,
  mzhdTheoryLayers,
  sectionMotion,
} from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

const accentMap = {
  sky: "border-sky-200 bg-sky-50/60 text-sky-800",
  emerald: "border-emerald-200 bg-emerald-50/60 text-emerald-800",
  violet: "border-violet-200 bg-violet-50/60 text-violet-800",
};

export function MzhdTheorySocialSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div {...sectionMotion}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg sm:aspect-[4/3] lg:sticky lg:top-36">
              <Image
                src={mzhdTheoryImages.social}
                alt="Жилой дом как социально-техническая система"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-sm leading-6 text-white/90">
                Три слоя пересекаются в каждом решении: техническое состояние,
                организация процессов и социальное принятие.
              </p>
            </div>
          </motion.div>

          <div>
            <MzhdTheorySectionHeader
              eyebrow="Социотехника"
              title="Дом как социально-техническая система"
              description="В одном контуре сходятся инженерные системы, финансы, люди и институты. Теория AKYL описывает, как согласовать интересы собственников, УК и города."
            />

            <div className="mt-10 space-y-5">
              {mzhdTheoryLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.article
                    key={layer.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                          accentMap[layer.accent],
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {layer.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {layer.text}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                          {layer.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="text-sky-600">·</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
