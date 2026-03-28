import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FeaturedTool() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-8 rounded-3xl border border-black/10 bg-slate-900 p-6 text-white shadow-sm md:grid-cols-2 md:p-10 lg:p-12">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
              Главный инструмент платформы
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Индекс эффективности управления
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              IEU помогает быстро оценить качество управления домом по ключевым
              блокам: процессы, финансы, контроль, KPI, взаимодействие и уровень
              цифровизации. Это не просто цифра, а управленческий ориентир для
              принятия решений.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools/index-efficiency">
                <Button>Открыть инструмент</Button>
              </Link>
              <Link href="/contacts">
                <Button variant="secondary">Запросить демонстрацию</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Что оценивается</p>
              <p className="mt-2 text-lg font-semibold">
                Финансы, процессы, роли, KPI, цифровизация
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Результат</p>
              <p className="mt-2 text-lg font-semibold">
                Понятная оценка состояния системы управления
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Для кого</p>
              <p className="mt-2 text-lg font-semibold">
                УК, ОСИ, девелоперы, консультанты, акиматы
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Цель</p>
              <p className="mt-2 text-lg font-semibold">
                Найти слабые места и точки роста
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}