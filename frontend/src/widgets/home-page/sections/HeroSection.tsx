"use client";

import { BarChart3, Clock3, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { homeHeroContent, homeHeroMetrics } from "../model/home-hero.data";

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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.45)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--page-hero-offset))] w-full max-w-7xl flex-col px-6 py-14 sm:py-16 lg:px-8 lg:py-16">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mx-auto w-full max-w-[820px]">
            <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {homeHeroContent.eyebrow}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-sora)] text-[clamp(2.25rem,4.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {homeHeroContent.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-7 text-white/85 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
              {homeHeroContent.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
              <Link
                href={homeHeroContent.primaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:scale-[1.02] sm:w-auto"
              >
                {homeHeroContent.primaryCta.label}
              </Link>
              {homeHeroContent.secondaryCta ? (
                <Link
                  href={homeHeroContent.secondaryCta.href}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/14 sm:w-auto"
                >
                  {homeHeroContent.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 shrink-0 sm:mt-14 lg:mt-10">
          <HeroMetrics />
        </div>
      </div>
    </section>
  );
}
