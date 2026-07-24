"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { Container } from "@/shared/ui/Container";
import {
  akimatAnalyticsSection,
  akimatStats,
  type AkimatStat,
} from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

function AnimatedStatValue({
  value,
  suffix,
  reduced,
}: {
  value: number;
  suffix: string;
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
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <span
      ref={ref}
      className="font-[family-name:var(--font-sora)] text-4xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-5xl"
    >
      {reduced ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}

function StatCell({
  stat,
  reduced,
}: {
  stat: AkimatStat;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      variants={akimatStaggerItem}
      className="border-t border-slate-200 py-8 first:border-t-0 sm:border-t-0 sm:border-l sm:border-slate-200 sm:px-8 sm:first:border-l-0 sm:first:pl-0"
    >
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
      <div className="mt-4">
        <AnimatedStatValue
          value={stat.value}
          suffix={stat.suffix}
          reduced={reduced}
        />
      </div>
      <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
        {stat.note}
      </p>
    </motion.div>
  );
}

export function AkimatAnalyticsSection() {
  const reduced = useReducedMotion();

  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="akimat-analytics-heading"
    >
      <Container>
        <motion.div {...akimatSectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            {akimatAnalyticsSection.eyebrow}
          </p>
          <h2
            id="akimat-analytics-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {akimatAnalyticsSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            {akimatAnalyticsSection.description}
          </p>

          <motion.div
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4"
            variants={akimatStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {akimatStats.map((stat) => (
              <StatCell key={stat.label} stat={stat} reduced={reduced} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
