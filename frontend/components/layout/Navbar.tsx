"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_LOGO_URL } from "@/lib/homeAssets";
import Link from "next/link";

type NavLink = { label: string; href: string };
type MegaLink = { title: string; description: string; href: string };

const topLinks: NavLink[] = [
  { label: "Методология", href: "/" },
  { label: "Платформа", href: "/" },
  { label: "Центр", href: "/" },
];

const megaGroups: Array<{ title: string; items: MegaLink[] }> = [
  {
    title: "Основы",
    items: [
      {
        title: "Теория управления",
        description: "Принципы и методы управления МЖД",
        href: "/",
      },
      {
        title: "Архитектура",
        description: "Структура системы и её компоненты",
        href: "/",
      },
      {
        title: "Роли",
        description: "Участники и их ответственность",
        href: "/",
      },
      {
        title: "Процессы",
        description: "Бизнес‑процессы и их взаимодействие",
        href: "/",
      },
    ],
  },
  {
    title: "Управление",
    items: [
      {
        title: "Финансовое управление",
        description: "Контроль доходов и расходов дома",
        href: "/fin-ypr",
      },
      {
        title: "KPI",
        description: "Показатели эффективности управления",
        href: "/",
      },
      {
        title: "Стандарты",
        description: "Принципы и стандарты системы",
        href: "/",
      },
      {
        title: "Аудит",
        description: "Диагностика и улучшения управления",
        href: "/",
      },
    ],
  },
  {
    title: "Ресурсы",
    items: [
      {
        title: "Библиотека знаний",
        description: "Статьи, исследования и материалы",
        href: "/",
      },
      {
        title: "Кейсы",
        description: "Практика внедрения на реальных домах",
        href: "/",
      },
      {
        title: "Инструменты",
        description: "Шаблоны, чек‑листы, калькуляторы",
        href: "/tools",
      },
      {
        title: "Контакты",
        description: "Связаться с командой AKYL",
        href: "/",
      },
    ],
  },
];

function useOnClickOutside(
  refs: Array<React.RefObject<HTMLElement | null>>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const inside = refs.some((r) => {
        const el = r.current;
        return el ? el.contains(target) : false;
      });
      if (!inside) onOutside();
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [enabled, onOutside, refs]);
}

export function Navbar() {
  const menuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([headerRef, megaRef], () => setMegaOpen(false), megaOpen);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur"
    >
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <img
              src={HOME_LOGO_URL}
              alt="AKYL"
              className="w-[150px] h-[50px] object-contain"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {topLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </a>
            ))}

            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls={menuId}
              onClick={() => setMegaOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <span>Ресурсы</span>
              <span
                aria-hidden="true"
                className={[
                  "inline-block transition-transform",
                  megaOpen ? "rotate-180" : "rotate-0",
                ].join(" ")}
              >
                ▾
              </span>
            </button>

            <div className="ml-2 flex items-center gap-2">
              <Button variant="secondary">Войти</Button>
              <Button>Консультация</Button>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-black/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={`${menuId}-mobile`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </Container>

      {megaOpen ? (
        <div
          ref={megaRef}
          id={menuId}
          className="hidden border-t border-black/10 bg-white lg:block"
        >
          <Container className="py-6">
            <div className="grid grid-cols-3 gap-8">
              {megaGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {g.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((it) => (
                      <li key={it.title}>
                        <a
                          href={it.href}
                          className="block rounded-2xl p-3 hover:bg-slate-50"
                        >
                          <p className="text-sm font-semibold text-slate-900">
                            {it.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {it.description}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      {mobileOpen ? (
        <div id={`${menuId}-mobile`} className="border-t border-black/10 lg:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              {topLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setMegaOpen((v) => !v)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
              >
                <span>Ресурсы</span>
                <span aria-hidden="true">{megaOpen ? "▴" : "▾"}</span>
              </button>
              {megaOpen ? (
                <div className="mt-2 grid gap-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  {megaGroups.map((g) => (
                    <div key={g.title}>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                        {g.title}
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {g.items.map((it) => (
                          <li key={it.title}>
                            <a
                              href={it.href}
                              className="block rounded-xl px-3 py-2 hover:bg-white"
                            >
                              <p className="text-sm font-semibold text-slate-900">
                                {it.title}
                              </p>
                              <p className="text-sm text-slate-600">
                                {it.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="secondary">Войти</Button>
                <Button>Консультация</Button>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

