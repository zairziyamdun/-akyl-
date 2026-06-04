"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import {
  consultationAudience,
  consultationFormats,
  consultationImages,
  consultationProblems,
  consultationResults,
  consultationSteps,
} from "@/lib/consultationData";

import {
  consultationCardHover,
  consultationSectionMotion,
  consultationStaggerContainer,
  consultationStaggerItem,
} from "./consultationMotion";

export function ConsultationForWhom() {
  const reduced = useReducedMotion();

  return (
    <Section className="bg-white">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <SectionHeading
            eyebrow="Аудитория"
            title="Для кого консультация"
            description="Формат подстраивается под роль участника и зрелость текущей модели управления."
          />
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={consultationStaggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {consultationAudience.map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  variants={consultationStaggerItem}
                  className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
                >
                  <motion.div
                    variants={consultationCardHover}
                    initial="rest"
                    whileHover={reduced ? undefined : "hover"}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={card.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-sky-700 shadow-md backdrop-blur-sm">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function ConsultationSteps() {
  const reduced = useReducedMotion();

  return (
    <Section id="consultation-steps" className="bg-slate-50/80">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Методология"
                title="Что входит в консультацию"
                description="Пять последовательных шагов — от диагностики до практического плана внедрения."
              />
              <motion.ol
                className="mt-10 space-y-3"
                variants={consultationStaggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {consultationSteps.map((step) => (
                  <motion.li
                    key={step.step}
                    variants={consultationStaggerItem}
                    className="group flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-sky-200/80 hover:shadow-md sm:p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-600 text-base font-bold text-white shadow-md shadow-sky-200/50">
                      {step.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-2 hidden h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-sky-600 sm:block" />
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-lg lg:sticky lg:top-28"
            >
              <div className="relative aspect-[4/5] min-h-[320px]">
                <Image
                  src={consultationImages.steps}
                  alt="Экспертная сессия AKYL"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-medium tracking-widest text-sky-200 uppercase">
                    Практика AKYL
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Структурированный разбор управления на объекте
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function ConsultationProblems() {
  return (
    <Section className="bg-white">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <SectionHeading
            eyebrow="Запросы клиентов"
            title="Какие задачи решаем"
            description="Консультация закрывает типовые проблемы управления МЖД на старте трансформации."
          />
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={consultationStaggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {consultationProblems.map((card, i) => (
              <motion.article
                key={card.title}
                variants={consultationStaggerItem}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-slate-200/90 p-5 shadow-sm",
                  "bg-gradient-to-br",
                  card.accent,
                )}
              >
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function ConsultationFormats() {
  const reduced = useReducedMotion();

  return (
    <Section className="bg-slate-50/80">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <SectionHeading
            eyebrow="Форматы"
            title="Форматы работы"
            description="Выберите глубину вовлечения — от экспресс-сессии до сопровождения внедрения."
          />
          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-3"
            variants={consultationStaggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {consultationFormats.map((format) => (
              <motion.article
                key={format.title}
                variants={consultationStaggerItem}
                whileHover={reduced ? undefined : { y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border shadow-sm",
                  format.highlight
                    ? "border-sky-300/80 ring-2 ring-sky-100"
                    : "border-slate-200/90",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={format.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-sky-800 shadow-sm backdrop-blur-sm">
                    {format.duration}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex flex-1 flex-col p-6",
                    format.highlight
                      ? "bg-gradient-to-br from-white to-sky-50/90"
                      : "bg-white",
                  )}
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {format.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {format.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function ConsultationResults() {
  const reduced = useReducedMotion();

  return (
    <Section className="bg-white">
      <Container>
        <motion.div {...consultationSectionMotion}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl"
            >
              <div className="relative aspect-[4/5] min-h-[360px] sm:min-h-[420px]">
                <Image
                  src={consultationImages.results}
                  alt="Результаты консультации"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/50 to-transparent" />
              </div>
            </motion.div>

            <div>
              <SectionHeading
                eyebrow="Итог"
                title="Результат консультации"
                description="По итогам вы получаете понятную картину и следующий шаг к системному управлению."
              />
              <motion.ul
                className="mt-8 space-y-3"
                variants={consultationStaggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {consultationResults.map((item) => (
                  <motion.li
                    key={item}
                    variants={consultationStaggerItem}
                    className="flex gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3.5 shadow-sm backdrop-blur-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-slate-800 sm:text-base">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function ConsultationFinalCta() {
  const reduced = useReducedMotion();

  return (
    <Section className="py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80">
        <Image
          src={consultationImages.cta}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/85 to-sky-950/75" />

        <Container className="relative py-16 sm:py-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Начните переход к профессиональному управлению
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Оставьте заявку, и мы поможем определить, с чего начать внедрение
              системы AKYL.
            </p>
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className="mt-8 inline-block"
            >
              <Button
                asChild
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                <Link href="#consultation-form">Запросить консультацию</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
