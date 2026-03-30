import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "404 — страница пока не готова",
  description:
    "Такой страницы пока нет. Возможно, она ещё в разработке или просто решила не спешить.",
};

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-12rem)] flex-col justify-center py-16 sm:py-24"
      aria-labelledby="not-found-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-3 opacity-90"
        style={{
          background:
            "repeating-linear-gradient(-45deg, #fbbf24 0 12px, #0f172a 12px 24px)",
        }}
        aria-hidden
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">
            ошибка 404
          </p>

          <h1
            id="not-found-heading"
            className="mt-4 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl"
          >
            Здесь пока{" "}
            <span className="relative inline-block">
              тишина
              <span
                className="absolute -bottom-1 left-0 right-0 h-2 rounded-sm bg-amber-300/80"
                aria-hidden
              />
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Похоже, этой страницы пока нет. Возможно, она ещё в разработке,
            на согласовании или просто, как это иногда бывает, решила не
            торопить события.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Ничего страшного: на сайте всё идёт по плану. Просто не каждый
            раздел любит появляться раньше времени.
          </p>

          <p className="mt-4 text-sm italic text-slate-400">
            Можно сказать, страница взяла небольшую производственную паузу.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary">
              <Link href="/">На главную</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/tools">К инструментам</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}