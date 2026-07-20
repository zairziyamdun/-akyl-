"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { mzhdTheoryPracticeLinks, sectionMotion } from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheoryPracticeSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Мост к практике"
            title="От теории к разделам методологии"
            description="Продолжите изучение по смежным темам или сразу перейдите к инструментам диагностики и отчётности."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {mzhdTheoryPracticeLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-sky-50 group-hover:text-sky-700">
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-400 transition group-hover:text-sky-600"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
