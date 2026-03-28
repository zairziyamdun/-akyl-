import { Button } from "@/components/ui/Button";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const cards = [
  {
    title: "Принимать решения на основе данных",
    text: "Вместо предположений работаете с фактами. Каждое число говорит правду о доме.",
  },
  {
    title: "Обосновывать тарифы перед жильцами",
    text: "Показываете, за что платят. Индекс становится аргументом, а не просьбой.",
  },
  {
    title: "Контролировать управляющую компанию",
    text: "Видите реальную работу, а не отчеты. Индекс растет или падает — это видно сразу.",
  },
];

export function Layout396() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 text-sm font-semibold md:mb-4">Значение</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Индекс управляет домом
          </h2>
          <p className="text-slate-600 md:text-lg">
            Превращает хаос в систему, данные в решения, недоверие в партнерство.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-center rounded-3xl border border-black/10 bg-white p-6 md:p-8"
            >
              <img
                src={HOME_IMAGE_URL}
                className="mb-5 h-12 w-12 rounded-xl object-cover md:mb-6"
                alt=""
              />
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
                {card.title}
              </h3>
              <p className="text-slate-600">{card.text}</p>
              <div className="mt-5 md:mt-6">
                <Button variant="link" rightIcon={<span>›</span>}>
                  Далее
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

