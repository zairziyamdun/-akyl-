"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  Clock3,
  Cog,
  House,
  Leaf,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";

import {
  homeHeroContent,
  homeHeroDiagramItems,
  homeHeroMetrics,
} from "../model/home-hero.data";

const DIAGRAM_CENTER = 50;
const DIAGRAM_ORBIT_RADIUS = 38;
const DIAGRAM_START_ANGLE = -90;

function getOrbitPosition(index: number, total: number) {
  const radians =
    ((DIAGRAM_START_ANGLE + (360 / total) * index) * Math.PI) / 180;

  return {
    x: DIAGRAM_CENTER + DIAGRAM_ORBIT_RADIUS * Math.cos(radians),
    y: DIAGRAM_CENTER + DIAGRAM_ORBIT_RADIUS * Math.sin(radians),
  };
}

function ManagementVisualization() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const orbitItems = homeHeroDiagramItems.map((item, index) => ({
    ...item,
    ...getOrbitPosition(index, homeHeroDiagramItems.length),
  }));
  const icons = {
    kpi: BarChart3,
    residents: Users,
    documents: ClipboardList,
    ecology: Leaf,
    security: ShieldCheck,
    analytics: LineChart,
    processes: Cog,
  } as const;

  return (
    <TooltipProvider delayDuration={120}>
      <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-visible motion-reduce:[&_*]:!animate-none sm:max-w-[520px] lg:translate-x-3 lg:max-w-[min(600px,calc(100svh-300px))] 2xl:translate-x-5 2xl:max-w-[min(660px,calc(100svh-300px))]">
        <div className="absolute inset-[13%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.17),rgba(3,20,35,0.08)_48%,transparent_72%)] blur-2xl" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(125,211,252,.2)"
            strokeWidth=".3"
          />
          <circle
            cx="50"
            cy="50"
            r="29"
            fill="none"
            stroke="rgba(125,211,252,.32)"
            strokeWidth=".35"
          />
          <circle
            cx="50"
            cy="50"
            r="23"
            fill="none"
            stroke="rgba(255,255,255,.18)"
            strokeWidth=".3"
            strokeDasharray="1.6 1.6"
            className="origin-center animate-[spin_42s_linear_infinite] motion-reduce:animate-none"
          />
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="rgba(3,20,35,.26)"
            stroke="rgba(56,189,248,.7)"
            strokeWidth=".45"
          />
          {orbitItems.map((item) => (
            <motion.line
              key={item.id}
              x1="50"
              y1="50"
              x2={item.x}
              y2={item.y}
              stroke={
                activeId === item.id
                  ? "rgba(125,211,252,.95)"
                  : "rgba(186,230,253,.38)"
              }
              strokeWidth={activeId === item.id ? 0.7 : 0.35}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="rgba(56,189,248,.75)"
            strokeWidth="1"
            strokeDasharray="5 15.1"
            strokeLinecap="round"
            className="origin-center animate-[spin_55s_linear_infinite_reverse] motion-reduce:animate-none"
          />
          <circle
            cx="50"
            cy="50"
            r="27"
            fill="none"
            stroke="rgba(125,211,252,.5)"
            strokeWidth=".65"
            strokeDasharray="2.8 9.3"
            strokeLinecap="round"
          />
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-300/70 bg-slate-950/35 shadow-[0_0_34px_rgba(14,165,233,.55),inset_0_0_28px_rgba(56,189,248,.16)] backdrop-blur-sm"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <House
            className="h-[56%] w-[56%] text-white drop-shadow-[0_0_8px_rgba(56,189,248,.9)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="sr-only">Многоквартирный жилой дом</span>
        </motion.div>

        {orbitItems.map((item, index) => {
          const Icon = icons[item.id];
          return (
            <Tooltip
              key={item.id}
              open={activeId === item.id ? true : undefined}
            >
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  aria-label={`${item.label}. ${item.description}`}
                  className="absolute z-30 flex h-[15%] min-h-10 w-[15%] min-w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-200/55 bg-slate-950/45 text-white shadow-[0_0_16px_rgba(14,165,233,.38)] backdrop-blur-md outline-none transition hover:border-sky-200 hover:bg-sky-900/60 hover:shadow-[0_0_25px_rgba(14,165,233,.65)] focus-visible:ring-2 focus-visible:ring-sky-300"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(item.id)}
                  onBlur={() => setActiveId(null)}
                  onClick={() =>
                    setActiveId((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                >
                  <Icon
                    className="h-[48%] w-[48%] drop-shadow-[0_0_5px_rgba(56,189,248,.8)]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={8}
                className="max-w-56 border border-white/10 bg-slate-950/95 px-3 py-2 shadow-xl"
              >
                <p className="font-semibold text-sky-200">{item.label}</p>
                <p className="mt-0.5 leading-4 text-slate-300">
                  {item.description}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

const metricIcons = {
  standards: ShieldCheck,
  efficiency: BarChart3,
  speed: Clock3,
  trust: Users,
} as const;

function HeroMetrics() {
  return (
    <div className="grid overflow-hidden rounded-[20px] border border-white/12 bg-slate-950/45 shadow-[0_18px_55px_rgba(0,0,0,.25)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
      {homeHeroMetrics.map((metric) => {
        const Icon = metricIcons[metric.icon];
        return (
          <div
            key={metric.title}
            className="flex min-h-28 items-center gap-4 border-white/10 px-5 py-5 sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              className="h-8 w-8 shrink-0 text-sky-400"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <p className="text-[10px] font-semibold uppercase leading-4 tracking-[0.04em] text-white">
                {metric.title}
              </p>
              {metric.value ? (
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  {metric.value}
                </p>
              ) : null}
              <p className="mt-1.5 text-[11px] leading-4 text-slate-300">
                {metric.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--page-hero-offset))] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeHeroContent.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/55 to-slate-900/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/10" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--page-hero-offset))] w-full max-w-7xl flex-col px-6 py-12 sm:py-16 lg:px-8 lg:py-12 xl:py-16">
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(460px,0.95fr)] lg:gap-8 xl:gap-12">
          <div className="min-w-0 max-w-[760px] self-center">
            <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {homeHeroContent.eyebrow}
            </span>
            <h1 className="mt-6 max-w-[760px] text-[clamp(2.25rem,3.8vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-white">
              {homeHeroContent.title}
            </h1>
            <p className="mt-7 max-w-[720px] text-[15px] leading-7 text-white/84 sm:text-base sm:leading-8 lg:text-lg">
              {homeHeroContent.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={homeHeroContent.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                {homeHeroContent.primaryCta.label}
              </Link>
              {homeHeroContent.secondaryCta ? (
                <Link
                  href={homeHeroContent.secondaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/14"
                >
                  {homeHeroContent.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="flex min-w-0 self-center items-center justify-center lg:justify-end">
            <ManagementVisualization />
          </div>
        </div>

        <div className="mt-12 shrink-0 lg:mt-10 xl:mt-12">
          <HeroMetrics />
        </div>
      </div>
    </section>
  );
}
