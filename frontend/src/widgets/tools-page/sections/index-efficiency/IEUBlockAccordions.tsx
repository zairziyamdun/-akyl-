import { Container } from "@/shared/ui/Container";
import { IEU_BLOCK_CRITERIA } from "@/widgets/tools-page";
import type { IEUBlockKey } from "@/types/ieu";

const order: IEUBlockKey[] = [
  "K1",
  "K2",
  "K3",
  "K4",
  "K5",
  "K6",
  "K7",
];

export function IEUBlockAccordions() {
  return (
    <section
      className="bg-slate-50 py-16 md:py-20"
      aria-labelledby="ieu-blocks-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-blocks-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Как считается каждый блок
          </h2>
          <p className="mt-4 text-slate-600">
            Внутри блока каждый критерий нормируется и усредняется — без
            перегруза формулами на экране. Ниже — состав, который вы задаёте в
            калькуляторе.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {order.map((key) => {
            const block = IEU_BLOCK_CRITERIA[key];
            return (
              <details
                key={key}
                className="group rounded-2xl border border-black/10 bg-white shadow-sm transition hover:border-slate-300 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-semibold text-slate-900">
                    {block.title}
                  </span>
                  <span
                    className="text-slate-400 transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▾
                  </span>
                </summary>
                <div className="border-t border-black/5 px-5 pb-5 pt-0 md:px-6 md:pb-6">
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-slate-400" aria-hidden>
                          ·
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
