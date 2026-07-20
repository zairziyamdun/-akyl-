"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/shared/ui/Container";
import {
  mzhdTheoryCybernetics,
  mzhdTheoryImages,
  sectionMotion,
} from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheoryCyberneticsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
      <div className="absolute inset-0 opacity-30">
        <Image
          src={mzhdTheoryImages.cybernetics}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <Container className="relative">
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Кибернетика"
            title={mzhdTheoryCybernetics.title}
            description={mzhdTheoryCybernetics.description}
            dark
          />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mzhdTheoryCybernetics.signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Icon className="text-sky-300" size={22} />
                <h3 className="mt-4 font-semibold">{signal.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {signal.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
