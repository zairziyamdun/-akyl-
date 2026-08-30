"use client";

import Image from "next/image";
import Link from "next/link";

import {
  homeTransitionAfter,
  homeTransitionBefore,
  homeTransitionBenefits,
  homeTransitionContent,
  homeTransitionCtaIcons,
  transitionPalette,
  type TransitionPoint,
} from "../model/home-management-transition.data";

function ComparisonColumn({
  tone,
  title,
  caption,
  items,
}: {
  tone: "before" | "after";
  title: string;
  caption: string;
  items: ReadonlyArray<TransitionPoint>;
}) {
  const isAfter = tone === "after";
  const color = isAfter ? transitionPalette.green : transitionPalette.red;

  return (
    <article className="flex h-full flex-col rounded-[18px] bg-white/[0.96] px-4 py-5 shadow-[0_8px_28px_rgba(0,20,40,0.18)] sm:px-5 sm:py-6">
      <div
        className="inline-flex w-fit max-w-full rounded-md px-3.5 py-2 text-[11px] font-bold tracking-[0.02em] text-white uppercase sm:text-[12px]"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>
      <p
        className="mt-3 text-[12px] font-bold tracking-[0.06em] uppercase sm:text-[13px]"
        style={{ color }}
      >
        {caption}
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-[14px]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className="text-[13px] font-bold leading-[1.25] tracking-[0.01em] uppercase sm:text-[14px]"
                  style={{ color }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-0.5 text-[12px] leading-[1.35] sm:text-[13px]"
                  style={{ color: transitionPalette.navy }}
                >
                  {item.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

/** Horizontal white arrow — as in mockup (not a tall vertical block) */
function TransitionArrow() {
  return (
    <div className="flex h-full items-center justify-center py-2 lg:py-0">
      {/* Mobile */}
      <div className="relative w-full max-w-md lg:hidden">
        <svg
          viewBox="0 0 520 140"
          className="h-auto w-full drop-shadow-[0_10px_24px_rgba(0,20,40,0.25)]"
          aria-hidden
        >
          <path
            d="M0 28 H360 V8 L520 70 L360 132 V112 H0 Z"
            fill="#ffffff"
          />
        </svg>
        <p
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center text-[12px] font-extrabold leading-snug tracking-[0.04em] uppercase sm:text-[13px]"
          style={{ color: transitionPalette.navy }}
        >
          {homeTransitionContent.bridgeLabel}
        </p>
      </div>

      {/* Desktop — tall-enough horizontal arrow spanning the center column */}
      <div className="relative hidden w-full max-w-[300px] lg:block xl:max-w-[340px]">
        <svg
          viewBox="0 0 420 220"
          className="h-auto w-full drop-shadow-[0_14px_32px_rgba(0,20,40,0.28)]"
          role="img"
          aria-label={homeTransitionContent.bridgeLabel}
        >
          <path
            d="M0 48 H290 V18 L420 110 L290 202 V172 H0 Z"
            fill="#ffffff"
          />
        </svg>
        <p
          className="pointer-events-none absolute inset-y-0 left-[6%] right-[28%] flex items-center justify-center text-center text-[13px] font-extrabold leading-[1.25] tracking-[0.05em] uppercase xl:text-[14px]"
          style={{ color: transitionPalette.navy }}
        >
          {homeTransitionContent.bridgeLabel}
        </p>
      </div>
    </div>
  );
}

export function HomeManagementTransitionSection() {
  const CtaLeftIcon = homeTransitionCtaIcons.left;
  const CtaRightIcon = homeTransitionCtaIcons.right;

  return (
    <section
      id="management-transition"
      className="relative scroll-mt-[calc(var(--site-header-height)+1.25rem)] overflow-x-clip bg-white"
    >
      {/* 1. Header — white, navy + green title */}
      <header className="mx-auto max-w-[1100px] px-5 pt-12 pb-7 text-center sm:px-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-9">
        <h2
          className="mx-auto max-w-[980px] text-[clamp(1.15rem,2.4vw,1.85rem)] font-extrabold leading-[1.25] tracking-[0.01em] uppercase"
          style={{ color: transitionPalette.navy }}
        >
          {homeTransitionContent.titleLead}{" "}
          <span style={{ color: transitionPalette.green }}>
            {homeTransitionContent.titleAccent}
          </span>
        </h2>
        <p
          className="mx-auto mt-3.5 max-w-[760px] text-[14px] leading-[1.55] sm:mt-4 sm:text-[15px] sm:leading-[1.6]"
          style={{ color: transitionPalette.navy }}
        >
          {homeTransitionContent.descriptionBefore}
          <span
            className="font-bold"
            style={{ color: transitionPalette.green }}
          >
            {homeTransitionContent.descriptionHighlight}
          </span>
          {homeTransitionContent.descriptionAfter}
        </p>
      </header>

      {/* 2. Comparison on full-bleed photo */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={homeTransitionContent.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_40%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[#001428]/20" />
        </div>

        <div className="relative mx-auto max-w-[1360px] px-3 py-7 sm:px-5 sm:py-9 lg:px-6 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(200px,0.7fr)_minmax(0,1.05fr)] lg:gap-4 xl:gap-5">
            <div className="order-1">
              <ComparisonColumn
                tone="before"
                title={homeTransitionContent.beforeTitle}
                caption={homeTransitionContent.beforeCaption}
                items={homeTransitionBefore}
              />
            </div>

            <div className="order-2 md:order-3 md:col-span-2 lg:order-2 lg:col-span-1">
              <TransitionArrow />
            </div>

            <div className="order-3 md:order-2 lg:order-3">
              <ComparisonColumn
                tone="after"
                title={homeTransitionContent.afterTitle}
                caption={homeTransitionContent.afterCaption}
                items={homeTransitionAfter}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Benefits — 6 columns, light gray */}
      <div style={{ backgroundColor: transitionPalette.benefitBg }}>
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-6 px-5 py-7 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-3 lg:px-6 lg:py-6">
          {homeTransitionBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-start gap-3 lg:flex-col lg:items-center lg:gap-2.5 lg:text-center"
              >
                <Icon
                  className="h-8 w-8 shrink-0"
                  strokeWidth={1.4}
                  style={{ color: transitionPalette.navy }}
                />
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-extrabold leading-snug tracking-[0.02em] uppercase sm:text-[12px]"
                    style={{ color: transitionPalette.navy }}
                  >
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-600 sm:text-[12px]">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CTA — two halves as in mockup */}
      <Link href={homeTransitionContent.ctaHref} className="block">
        <div className="grid lg:grid-cols-2">
          <div
            className="flex items-center gap-3 px-5 py-5 sm:px-7 sm:py-6"
            style={{
              background:
                "linear-gradient(90deg, #0a2a4a 0%, #1a4d2e 55%, #245C28 100%)",
            }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3d9a4a] text-white">
              <CtaLeftIcon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <p className="text-[13px] leading-snug font-medium text-white sm:text-[14px]">
              {homeTransitionContent.ctaLeft}
            </p>
          </div>
          <div
            className="flex items-center gap-3 px-5 py-5 sm:px-7 sm:py-6"
            style={{ backgroundColor: transitionPalette.greenDeep }}
          >
            <CtaRightIcon
              className="h-7 w-7 shrink-0 text-white"
              strokeWidth={1.5}
            />
            <p className="text-[12px] leading-snug font-extrabold tracking-[0.03em] text-white uppercase sm:text-[13px]">
              {homeTransitionContent.ctaRight}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
