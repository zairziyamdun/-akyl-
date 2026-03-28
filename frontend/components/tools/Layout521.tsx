import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const kpis = [
  {
    title: "Технические показатели",
    description: "Состояние инженерных систем и своевременность ремонтов",
  },
  {
    title: "Финансовые метрики",
    description: "Эффективность сбора платежей и управление расходами",
  },
  {
    title: "Удовлетворенность жителей",
    description: "Оценка качества обслуживания и уровень доверия",
  },
  {
    title: "Автоматизация мониторинга",
    description: "Система собирает данные и генерирует отчеты автоматически",
  },
];

export function Layout521() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
              Инструменты
            </p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              KPI управления домом
            </h2>
            <p className="text-slate-600 md:text-lg">
              Отслеживайте технические показатели, финансовые результаты
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="relative overflow-hidden rounded-3xl p-6 shadow-sm ring-1 ring-black/10"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={HOME_IMAGE_URL}
                  className="h-full w-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative z-10">
                <img
                  src={HOME_IMAGE_URL}
                  className="mb-3 h-12 w-12 rounded-xl object-cover md:mb-4"
                  alt=""
                />
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  {kpi.title}
                </h3>
                <p className="text-white/90">{kpi.description}</p>
                <div className="mt-5 flex items-center md:mt-6">
                  <Button variant="link" className="text-white" rightIcon={<span>›</span>}>
                    →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

