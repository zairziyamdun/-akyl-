import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";

/** Closing call to action: turns a finished read into a consultation request. */
export function ArticleConsultationCta() {
  return (
    <aside
      aria-labelledby="article-cta-heading"
      className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span
            aria-hidden
            className="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700 ring-1 ring-slate-200 sm:inline-flex"
          >
            <MessageCircle className="size-5" />
          </span>
          <div>
            <h2
              id="article-cta-heading"
              className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl"
            >
              Хотите применить это в своей управляющей компании?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-[15px]">
              Разберём вашу ситуацию и подскажем, с чего начать внедрение.
            </p>
          </div>
        </div>
        <Button asChild className="shrink-0 rounded-full px-6">
          <Link href="/consultation">
            Получить консультацию
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </aside>
  );
}
