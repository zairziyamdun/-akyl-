import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

export function Layout373() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 text-sm font-semibold md:mb-4">Расчет</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Как работает система
            </h2>
            <p className="text-slate-600 md:text-lg">
              Каждый блок считается как среднее значение входящих в него
              показателей.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="grid grid-cols-1 rounded-3xl border border-black/10 bg-white sm:col-span-2">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
              <img
                src={HOME_IMAGE_URL}
                className="mb-5 h-12 w-12 rounded-xl object-cover md:mb-6"
                alt=""
              />
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Прямые показатели
              </h3>
              <p className="text-slate-600">
                Чем выше значение, тем лучше результат. Например, собираемость
                взносов или выполнение плана.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button variant="secondary">Смотреть</Button>
                <Button variant="link" rightIcon={<span>›</span>}>
                  Далее
                </Button>
              </div>
            </div>
          </div>

          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex flex-col rounded-3xl border border-black/10 bg-white">
              <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
                <div>
                  <img
                    src={HOME_IMAGE_URL}
                    alt=""
                    className="mb-3 h-12 w-12 rounded-xl object-cover md:mb-4"
                  />
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Обратные показатели
                  </h3>
                  <p className="text-slate-600">
                    Чем ниже значение, тем лучше. Например, просроченные дефекты
                    или задолженность.
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button variant="link" rightIcon={<span>›</span>}>
                    Далее
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

