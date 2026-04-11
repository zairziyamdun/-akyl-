"use client";

import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Системный подход",
    description:
      "Дом рассматривается не как набор разрозненных задач, а как единая управляемая система с понятными связями, ролями и целями.",
    tag: "Архитектура",
  },
  {
    number: "02",
    title: "Измеримость управления",
    description:
      "Качество управления оценивается через KPI, индексы эффективности, отчётность и план-факт контроль, а не через субъективные ощущения.",
    tag: "KPI",
  },
  {
    number: "03",
    title: "Прозрачность процессов",
    description:
      "Финансы, заявки, подрядчики, коммуникации и результаты управления должны быть понятны всем участникам системы.",
    tag: "Прозрачность",
  },
  {
    number: "04",
    title: "Цифровая логика",
    description:
      "Управление усиливается данными, аналитикой и цифровыми инструментами, которые помогают принимать решения быстрее и точнее.",
    tag: "Данные",
  },
];

export function ManagementDefinitionSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#07111f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,204,82,0.10),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:pt-8"
          >
            <span className="inline-flex items-center rounded-full border border-[#f2cc52]/20 bg-[#f2cc52]/8 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.26em] text-[#f2cc52]">
              Что это такое
            </span>

            <h2 className="mt-6 max-w-[720px] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Профессиональное управление МЖД — это система, а не набор
              разрозненных действий
            </h2>

            <p className="mt-6 max-w-[640px] text-base leading-8 text-white/72 sm:text-lg">
              Это модель управления, в которой процессы, финансы, роли,
              контроль и данные объединены в единую управленческую логику.
              Такой подход снижает хаос, делает решения понятными и позволяет
              управлять домом на основе показателей, а не интуиции.
            </p>

            <div className="mt-8 grid max-w-[620px] gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="text-sm font-medium text-white">
                  KPI и измеримость
                </div>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Управление можно оценивать, сравнивать и улучшать через
                  конкретные показатели.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="text-sm font-medium text-white">
                  Прозрачность и контроль
                </div>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Все ключевые процессы становятся видимыми для участников и
                  управляющей стороны.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative pl-8"
              >
                <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-[#f2cc52]/40 via-white/10 to-transparent" />

                <div className="grid gap-5">
                  {principles.map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: index * 0.08,
                      }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="group relative"
                    >
                      <div className="absolute left-[-32px] top-8 z-10 h-3 w-3 rounded-full border border-[#f2cc52]/50 bg-[#f2cc52] shadow-[0_0_18px_rgba(242,204,82,0.45)]" />

                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/16 group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(242,204,82,0.10),transparent_34%)]" />

                        <div className="relative flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f2cc52]/20 bg-[#f2cc52]/10 text-sm font-semibold text-[#f2cc52]">
                            {item.number}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-lg font-semibold tracking-tight text-white sm:text-[22px]">
                                {item.title}
                              </h3>

                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                                {item.tag}
                              </span>
                            </div>

                            <p className="mt-3 max-w-[460px] text-sm leading-7 text-white/64 sm:text-[15px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}