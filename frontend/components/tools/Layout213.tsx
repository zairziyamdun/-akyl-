import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function Layout213() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5 md:order-1">
            <img src={HOME_IMAGE_URL} className="w-full object-cover" alt="" />
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-5 md:mb-6">
              <img
                src={HOME_IMAGE_URL}
                className="h-20 w-20 rounded-2xl object-cover"
                alt=""
              />
            </div>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Шаблоны управленческой отчетности
            </h2>
            <p className="text-slate-600 md:text-lg">
              Готовые формы для ежемесячных и квартальных отчетов. Система
              автоматически заполняет данные из вашей работы и готовит документы к
              отправке.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button variant="secondary">Скачать</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

