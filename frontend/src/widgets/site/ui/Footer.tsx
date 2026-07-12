"use client";

import { useMemo, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Input } from "@/shared/ui/Input";
import { HOME_LOGO_URL } from "@/widgets/home-page";
import Image from "next/image";
import Link from "next/link";

type LinkItem = { label: string; href: string };

const columns: Array<{ title: string; links: LinkItem[] }> = [
  {
    title: "Разделы",
    links: [
      { label: "База знаний", href: "/library" },
      { label: "Платформа", href: "/" },
      { label: "Практика", href: "/" },
      { label: "Консультация", href: "/consultation" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Библиотека знаний", href: "/" },
      { label: "Кейсы", href: "/" },
      { label: "Шаблоны", href: "/" },
      { label: "Инструменты", href: "/" },
    ],
  },
];

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={HOME_LOGO_URL}
                alt="AKYL"
                width={170}
                height={56}
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
              Подпишитесь на обновления материалов и практики внедрения.
            </p>

            <form
              className="mt-5 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                // Intentionally no real integration on scaffold.
                setEmail("");
              }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button variant="secondary" type="submit">
                Подписаться
              </Button>
            </form>

            <p className="mt-3 text-xs text-slate-500">
              Нажимая «Подписаться», вы соглашаетесь с политикой обработки данных.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-sm font-semibold text-slate-900">{c.title}</h3>
                <ul className="mt-4 space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Соцсети</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { label: "Facebook", href: "/" },
                  { label: "Instagram", href: "/" },
                  { label: "X", href: "/" },
                  { label: "LinkedIn", href: "/" },
                  { label: "YouTube", href: "/" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-black/10" />
        <div className="mt-6 flex flex-col-reverse gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {year} AKYL. Все права защищены.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/" className="hover:text-slate-900 hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-slate-900 hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-slate-900 hover:underline underline-offset-4">
                Cookies Settings
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

