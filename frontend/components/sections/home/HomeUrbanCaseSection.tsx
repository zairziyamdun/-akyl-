"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { homeTransition, homeViewport } from "@/lib/homePageMotion";

const bullets = [
  "Единые регламенты и понятные роли в контуре УК и подрядчиков.",
  "Согласованные KPI и отчётность для управленческих решений.",
  "Прозрачная коммуникация с жителями и городским контуром.",
];

export function HomeUrbanCaseSection() {
  return (
    <section className="relative border-b border-slate-200/80">
      <div className="relative min-h-[420px] lg:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2000&q=80"
          alt="Городская жилая среда"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-900/25 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/65 lg:to-slate-950/20" />

        <Container className="relative flex min-h-[420px] items-end py-16 lg:min-h-[520px] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
            className="max-w-xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md lg:max-w-lg"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Городская практика
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Когда дом становится управляемым активом
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
              Методология проявляется в реальных контурах: фонд, подрядчики, жители, регуляторика.
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-white/90 sm:text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
