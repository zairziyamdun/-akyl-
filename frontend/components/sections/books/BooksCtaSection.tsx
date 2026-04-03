import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function BooksCtaSection() {
  return (
    <section className="bg-neutral-950">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Изучайте методологию AKYL и собирайте управление в систему
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              Перейдите в методологию, откройте библиотеку знаний, получите
              консультацию и свяжитесь с Центром AKYL — мы поможем
              адаптировать модель под вашу организацию.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button asChild className="rounded-full px-6">
                <Link href="/methodology">Изучить методологию</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 border border-white/15 bg-white/8 text-white hover:bg-white/12"
              >
                <Link href="/contacts">Связаться с Центром AKYL</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

