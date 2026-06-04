"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { systemBlocks } from "@/data/mzhdData";

import { sectionMotion } from "./mzhdMotion";

export function MzhdSystemSection() {
  return (
    <motion.section className="py-16 sm:py-20" {...sectionMotion}>
      <Container>
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          МЖД - это не просто дом, а управляемая система
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {systemBlocks.map((block) => (
            <div
              key={block}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-medium shadow-sm"
            >
              {block}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 w-fit rounded-2xl border border-slate-900 bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-lg">
          МЖД
        </div>
      </Container>
    </motion.section>
  );
}
