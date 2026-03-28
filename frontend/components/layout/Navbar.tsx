"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOME_LOGO_URL } from "@/lib/homeAssets";

type NavItem = {
  label: string;
  href: string;
};

type MegaItem = {
  title: string;
  description: string;
  href: string;
};

type MegaGroup = {
  title: string;
  items: MegaItem[];
};

const primaryLinks: NavItem[] = [
  { label: "Инструменты", href: "/tools" },
  { label: "AKYL", href: "/akyl" },
  { label: "Кейсы", href: "/cases" },
  { label: "Журнал", href: "/journal" },
  { label: "Контакты", href: "/contacts" },
];

const megaGroups: MegaGroup[] = [
  {
    title: "Методология",
    items: [
      {
        title: "Методология управления",
        description: "Подход, структура и логика профессионального управления МЖД",
        href: "/methodology",
      },
      {
        title: "Теория управления МЖД",
        description: "Системный и научный подход к управлению домом",
        href: "/methodology/theory",
      },
      {
        title: "Архитектура системы",
        description: "Компоненты, связи и уровни системы управления",
        href: "/methodology/architecture",
      },
      {
        title: "Роли участников",
        description: "Ответственность, взаимодействие и управленческие роли",
        href: "/methodology/roles",
      },
    ],
  },
  {
    title: "Атлас",
    items: [
      {
        title: "Атлас управления",
        description: "Визуальная карта системы управления МЖД",
        href: "/atlas",
      },
      {
        title: "Архитектура управления",
        description: "Схема всех ключевых элементов и связей",
        href: "/atlas/architecture",
      },
      {
        title: "Карты процессов",
        description: "Пошаговые карты бизнес-процессов управления",
        href: "/atlas/process-maps",
      },
      {
        title: "Схемы взаимодействия",
        description: "Модели коммуникаций, ролей и принятия решений",
        href: "/atlas/interactions",
      },
    ],
  },
  {
    title: "База знаний",
    items: [
      {
        title: "Библиотека знаний",
        description: "Материалы, статьи, шаблоны и исследования",
        href: "/library",
      },
      {
        title: "Аналитика и статьи",
        description: "Экспертные публикации и обзоры отрасли",
        href: "/library/articles",
      },
      {
        title: "Научные исследования",
        description: "Исследовательская база и научные материалы",
        href: "/library/research",
      },
      {
        title: "Шаблоны",
        description: "Готовые документы и инструменты для практики",
        href: "/library/templates",
      },
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useOnClickOutside(
  refs: Array<React.RefObject<HTMLElement | null>>,
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const target = event.target as Node | null;

      const clickedInside = refs.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });

      if (!clickedInside) handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler, enabled]);
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  return <NavbarInner key={pathname} pathname={pathname} />;
}

function NavbarInner({ pathname }: { pathname: string }) {
  const menuId = useId();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMegaOpen, setDesktopMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(
    [headerRef, megaRef],
    () => {
      setDesktopMegaOpen(false);
    },
    desktopMegaOpen,
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopMegaOpen(false);
        setMobileOpen(false);
        setMobileMegaOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const systemActive =
    isActive(pathname, "/methodology") ||
    isActive(pathname, "/atlas") ||
    isActive(pathname, "/library");

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md"
    >
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex shrink-0 items-center">
            <Image
              src={HOME_LOGO_URL}
              alt="AKYL"
              width={150}
              height={50}
              className="h-[50px] w-[150px] object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              aria-expanded={desktopMegaOpen}
              aria-controls={menuId}
              onClick={() => setDesktopMegaOpen((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
                systemActive || desktopMegaOpen
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              <span>Система</span>
              <span
                aria-hidden="true"
                className={cn(
                  "transition-transform",
                  desktopMegaOpen && "rotate-180",
                )}
              >
                ▾
              </span>
            </button>

            {primaryLinks.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-3 flex items-center gap-2">
              <Button variant="secondary" asChild>
                <Link href="/login">Войти</Link>
              </Button>

              <Button asChild>
                <Link href="/contacts">Консультация</Link>
              </Button>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-black/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={`${menuId}-mobile`}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">Открыть меню</span>
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </Container>

      {desktopMegaOpen && (
        <div
          ref={megaRef}
          id={menuId}
          className="hidden border-t border-black/10 bg-white lg:block"
        >
          <Container className="py-6">
            <div className="grid grid-cols-3 gap-8">
              {megaGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {group.title}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-2xl p-3 transition hover:bg-slate-50",
                            isActive(pathname, item.href) && "bg-slate-50",
                          )}
                        >
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {mobileOpen && (
        <div
          id={`${menuId}-mobile`}
          className="border-t border-black/10 bg-white lg:hidden"
        >
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setMobileMegaOpen((prev) => !prev)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition",
                  systemActive || mobileMegaOpen
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                <span>Система</span>
                <span aria-hidden="true">{mobileMegaOpen ? "▴" : "▾"}</span>
              </button>

              {mobileMegaOpen && (
                <div className="grid gap-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  {megaGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                        {group.title}
                      </h3>

                      <ul className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-xl px-3 py-2 transition hover:bg-white",
                                isActive(pathname, item.href) && "bg-white",
                              )}
                            >
                              <p className="text-sm font-semibold text-slate-900">
                                {item.title}
                              </p>
                              <p className="text-sm leading-relaxed text-slate-600">
                                {item.description}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {primaryLinks.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-sm font-medium transition",
                      active
                        ? "bg-slate-100 text-slate-950"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="secondary" asChild>
                  <Link href="/login">Войти</Link>
                </Button>

                <Button asChild>
                  <Link href="/contacts">Консультация</Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}