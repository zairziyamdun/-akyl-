"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

import { ieuRows, ieuSummary } from "../../model/mzhd.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

function AnimatedScore({
  value,
  reduced,
}: {
  value: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 0.8,
  });

  useEffect(() => {
    if (reduced || inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, reduced, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = String(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? value : 0}
    </span>
  );
}

export function MzhdIeuSection() {
  const reduced = useReducedMotion();
  const scoreValue = Number.parseInt(ieuSummary.score, 10);

  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="mzhd-ieu-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div {...sectionMotion}>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
              Измеримость
            </p>
            <h2
              id="mzhd-ieu-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Эффективность должна быть измеримой
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              IEU отражает целостность управления домом: от финансовой
              устойчивости до качества сервисных процессов и прозрачности
              исполнения.
            </p>

            <div className="mt-10 flex flex-wrap items-end gap-x-3 gap-y-1 border-t border-slate-200 pt-8">
              <p className="font-[family-name:var(--font-sora)] text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                <AnimatedScore value={scoreValue} reduced={reduced} />
                <span className="text-3xl text-slate-400 sm:text-4xl">
                  /{ieuSummary.scoreMax}
                </span>
              </p>
              <p className="pb-2 text-sm font-medium text-slate-500">
                {ieuSummary.scoreLabel} · {ieuSummary.status}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-xl">
                <Link href="/tools/index-efficiency">Рассчитать индекс</Link>
              </Button>
              <Button asChild variant="secondary" className="h-11 rounded-xl">
                <Link href="/mzhd/kpi">О KPI и IEU</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="space-y-5"
            variants={mzhdStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {ieuRows.map((row) => (
              <motion.div key={row.label} variants={mzhdStaggerItem}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {row.label}
                  </span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {row.value}%
                  </span>
                </div>
                <div
                  className="h-1.5 overflow-hidden bg-slate-200"
                  role="progressbar"
                  aria-label={row.label}
                  aria-valuenow={row.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    className="h-full bg-slate-900"
                    initial={{ width: reduced ? `${row.value}%` : "0%" }}
                    whileInView={{ width: `${row.value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
