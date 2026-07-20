"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MoveRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  MEGA_MENU_LINKS,
  MEGA_MENU_STANDALONE_LINK,
} from "@/shared/consts";
import { cn } from "@/shared/lib";
import {
  hasActiveMegaMenuLink,
  isMegaMenuLinkActive,
  isStandaloneNavActive,
} from "../lib/mega-menu-active";

export function MegaMenuNav() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeCategoryId) return;

    const onPointerDown = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveCategoryId(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [activeCategoryId]);

  useEffect(() => {
    setActiveCategoryId(null);
  }, [pathname]);

  const handleToggle = (id: string) => {
    setActiveCategoryId((prev) => (prev === id ? null : id));
  };

  const standaloneActive = isStandaloneNavActive(
    MEGA_MENU_STANDALONE_LINK.href,
    pathname,
  );

  return (
    <div ref={navRef} className="hidden xl:flex items-center gap-1">
      <nav className="flex items-center gap-1" aria-label="Основная навигация">
        {MEGA_MENU_LINKS.map((category) => {
          const isOpen = activeCategoryId === category.id;
          const isCurrentCategory = hasActiveMegaMenuLink(category, pathname);
          const isButtonActive = isOpen || isCurrentCategory;
          const columnCount = category.columns?.length ?? 1;

          return (
            <div key={category.id} className="relative">
              <button
                type="button"
                onClick={() => handleToggle(category.id)}
                className={cn(
                  "group flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold transition",
                  isButtonActive
                    ? "bg-white/12 text-white"
                    : "text-white/75 hover:bg-white/7 hover:text-white",
                )}
                aria-expanded={isOpen}
              >
                {category.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 opacity-70 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      aria-label="Закрыть меню"
                      className="fixed inset-0 top-[4.25rem] -z-10 bg-black/40 backdrop-blur-[2px]"
                      onClick={() => setActiveCategoryId(null)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="fixed left-0 right-0 top-[4.25rem] z-50 overflow-hidden border-b border-white/10 bg-[#0a101c] shadow-2xl shadow-black/50"
                    >
                      <div className="mx-auto max-w-7xl px-6 py-10">
                        <div
                          className={cn(
                            "grid gap-8",
                            columnCount >= 3 && "grid-cols-3",
                            columnCount === 2 && "grid-cols-2 max-w-4xl",
                            columnCount === 1 && "grid-cols-1 max-w-md",
                          )}
                        >
                          {category.columns?.map((column) => {
                            const ColumnIcon = column.icon;
                            return (
                              <div
                                key={column.title}
                                className="flex flex-col gap-3 rounded-2xl p-3 transition hover:bg-white/[0.03]"
                              >
                                <div className="flex items-center gap-2 px-1">
                                  {ColumnIcon && (
                                    <ColumnIcon className="h-4 w-4 text-sky-400/70" />
                                  )}
                                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                                    {column.title}
                                  </h3>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  {column.links.map((link) => {
                                    const LinkIcon = link.icon;
                                    const isCurrentLink = isMegaMenuLinkActive(
                                      link.href,
                                      pathname,
                                    );
                                    const linkClassName = cn(
                                      "group/item flex items-center justify-between rounded-xl border border-transparent p-3 transition",
                                      "text-white/70 hover:border-white/8 hover:bg-white/[0.06] hover:text-white",
                                      isCurrentLink &&
                                        "border-sky-400/20 bg-sky-400/10 font-semibold text-white",
                                    );
                                    const linkContent = (
                                      <>
                                        <div className="flex flex-1 items-center gap-3">
                                          {LinkIcon && (
                                            <LinkIcon
                                              className={cn(
                                                "h-4 w-4 text-white/35 transition-colors group-hover/item:text-sky-300",
                                                isCurrentLink && "text-sky-300",
                                              )}
                                            />
                                          )}
                                          <span className="text-[15px] leading-tight">
                                            {link.title}
                                          </span>
                                        </div>
                                        {link.hasArrow && (
                                          <MoveRight className="h-4 w-4 -translate-x-2 text-sky-300 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                        )}
                                      </>
                                    );

                                    if (link.external) {
                                      return (
                                        <a
                                          key={link.title}
                                          href={link.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() =>
                                            setActiveCategoryId(null)
                                          }
                                          className={linkClassName}
                                        >
                                          {linkContent}
                                        </a>
                                      );
                                    }

                                    return (
                                      <Link
                                        key={link.title}
                                        href={link.href}
                                        onClick={() => setActiveCategoryId(null)}
                                        className={linkClassName}
                                      >
                                        {linkContent}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {category.id === "methodology" && (
                          <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                Цифровые инструменты AKYL
                              </p>
                              <p className="mt-1 max-w-xl text-sm text-white/50">
                                IEU, бюджет, чек-листы и управленческие отчёты
                                для системного контроля дома.
                              </p>
                            </div>
                            <Link
                              href="/tools"
                              onClick={() => setActiveCategoryId(null)}
                              className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                              Открыть инструменты
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <Link
        href={MEGA_MENU_STANDALONE_LINK.href}
        className={cn(
          "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition",
          standaloneActive
            ? "bg-white/12 text-white"
            : "text-white/75 hover:bg-white/7 hover:text-white",
        )}
      >
        {MEGA_MENU_STANDALONE_LINK.label}
      </Link>
    </div>
  );
}
