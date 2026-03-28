import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function Layout19() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
              Анализ
            </p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Анализ бюджета дома
            </h2>
            <p className="mb-5 text-slate-600 md:mb-6 md:text-lg">
              Инструмент показывает полную картину доходов и расходов дома.
              Планируйте бюджет с уверенностью и находите резервы для экономии.
            </p>
            <ul className="my-4 list-disc pl-5 text-slate-700">
              <li className="my-1 self-start pl-2">
                <p>Визуализация расходов по категориям</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Прогнозирование бюджета на квартал и год</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Рекомендации по оптимизации затрат</p>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="secondary">Подробнее</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                →
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5">
            <img src={HOME_IMAGE_URL} className="w-full object-cover" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

