import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  Layers3,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const learningPath = [
  {
    step: "01",
    title: "Системная база",
    text: "Формируем единое понимание логики управления многоквартирным домом: роли, процессы, зоны ответственности, KPI и управленческие связи.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Прикладная практика",
    text: "Разбираем реальные управленческие сценарии: бюджет, качество сервиса, коммуникации, конфликты, подрядчики и контроль исполнения.",
    icon: Target,
  },
  {
    step: "03",
    title: "Внедрение в контекст",
    text: "Адаптируем подход под зрелость компании, структуру портфеля, внутренние регламенты и управленческие задачи конкретной команды.",
    icon: Layers3,
  },
] as const;

const formats = [
  {
    title: "Онлайн-программы",
    description:
      "Структурированные модули для руководителей и ключевых ролей УК. Подходят для последовательного освоения модели без отрыва от операционной работы.",
  },
  {
    title: "Практикумы",
    description:
      "Интенсивный формат с фокусом на разбор кейсов, решений и типовых управленческих узких мест на практике.",
  },
  {
    title: "Корпоративный формат",
    description:
      "Настройка содержания и глубины программы под вашу компанию, портфель объектов, структуру команды и уровень процессов.",
  },
] as const;

const audience = [
  {
    title: "Руководители и собственники УК",
    text: "Для тех, кто отвечает за стратегию, устойчивость модели управления и качество управленческих решений.",
    icon: Briefcase,
  },
  {
    title: "Руководители направлений и ключевые специалисты",
    text: "Для тех, кто управляет финансами, эксплуатацией, клиентским блоком, подрядчиками и внутренними регламентами.",
    icon: Users,
  },
  {
    title: "Девелоперы и профессиональные управляющие",
    text: "Для команд, которые выстраивают систему управления объектом на этапе запуска, передачи и дальнейшей эксплуатации.",
    icon: Building2,
  },
] as const;

const outcomes = [
  "Понимание целостной архитектуры управления домом",
  "Единый язык для руководителей, специалистов и подрядчиков",
  "Практические решения вместо абстрактной теории",
  "Основа для внедрения KPI, регламентов и цифровых инструментов",
] as const;

export function LearningSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-slate-200/70 bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="learning-section-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          headingId="learning-section-heading"
          align="center"
          eyebrow="Образовательная линия"
          title="Обучение как продолжение модели AKYL, а не отдельный курс"
          description="AKYL рассматривает обучение как инструмент профессионального взросления отрасли: от системного понимания модели управления до конкретных решений, которые можно применять в реальной работе."
          className="mx-auto max-w-4xl"
        />

        <div className="mt-16 overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-950 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.55)]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.14),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:38px_38px]" />

            <div className="relative grid gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-14">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                  <GraduationCap className="h-4 w-4" />
                  Путь развития
                </div>

                <h3 className="mt-6 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  От книги и принципов — к навыкам, управленческой культуре и
                  внедрению в компании
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-[15px]">
                  Здесь обучение не существует отдельно от практики. Оно
                  продолжает модель AKYL и переводит идеи в управленческие
                  решения, командные стандарты и рабочие инструменты.
                </p>

                <div className="mt-8 grid gap-3">
                  {outcomes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                      <p className="text-sm leading-6 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4">
                  {learningPath.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.step}
                        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 md:p-6"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Этап {item.step}
                              </div>
                              <h4 className="mt-2 text-xl font-semibold tracking-tight text-white">
                                {item.title}
                              </h4>
                              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                                {item.text}
                              </p>
                            </div>
                          </div>

                          <div className="pl-16 md:pl-0">
                            <ArrowRight className="h-5 w-5 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-slate-300" />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Форматы
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Несколько сценариев обучения под разные задачи и уровень зрелости
            </h3>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {formats.map((format, index) => (
              <article
                key={format.title}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.28)] md:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-300" />
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Формат 0{index + 1}
                </div>
                <h4 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                  {format.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {format.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Для кого
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Кому адресована образовательная линия AKYL
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Мы говорим не только про обучение отдельных сотрудников, а про
              развитие управленческой среды компании и профессиональной культуры
              отрасли в целом.
            </p>
          </div>

          <div className="grid gap-5 lg:col-span-8 md:grid-cols-3">
            {audience.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-100 via-white to-slate-100">
          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:items-center lg:px-14 lg:py-14">
            <div className="lg:col-span-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Следующий шаг
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Посмотрите программы и выберите формат, который соответствует
                вашим задачам и уровню управления
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                От индивидуального профессионального развития до корпоративной
                настройки программы под вашу модель управления, процессы и
                команду.
              </p>
            </div>

            <div className="flex lg:col-span-4 lg:justify-end">
              <Button asChild variant="primary" className="w-full md:w-auto">
                <Link href="/akyl" className="inline-flex items-center gap-2">
                  Посмотреть программы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}