import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function Layout359() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 text-sm font-semibold text-slate-700 md:mb-4">
              Контроль
            </p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Чек-листы оценки управления
            </h2>
            <p className="text-slate-600 md:text-lg">
              Проверяйте качество работы регулярно и систематично
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 rounded-3xl border border-black/10 bg-white md:grid-cols-2">
          <div className="flex items-center justify-center overflow-hidden rounded-l-3xl">
            <img src={HOME_IMAGE_URL} className="h-full w-full object-cover" alt="" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Аудит</p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Интерактивные чек-листы для самоконтроля
              </h3>
              <p className="text-slate-600">
                Готовые формы для проверки технического состояния, финансовой
                дисциплины и уровня обслуживания. Заполняйте их быстро и получайте
                оценку качества управления в реальном времени.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="secondary">Использовать</Button>
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

