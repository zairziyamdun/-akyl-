"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Container } from "@/shared/ui/Container";
import { homeTransition, homeViewport } from "../model/homePageMotion";

type HomePhotoSplitSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  imageLeft?: boolean;
};

export function HomePhotoSplitSection({
  eyebrow,
  title,
  body,
  imageUrl,
  imageAlt,
  imageLeft = true,
}: HomePhotoSplitSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-slate-200/80 bg-slate-100/50">
      <Container className="py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            style={{ y }}
            className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.25)] lg:aspect-[5/4] ${imageLeft ? "" : "lg:order-2"}`}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
            className={imageLeft ? "" : "lg:order-1"}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[40px] lg:leading-[1.12]">
              {title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{body}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
