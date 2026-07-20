"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MoveRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MEGA_MENU_LINKS,
  MEGA_MENU_STANDALONE_LINK,
} from "@/shared/consts";
import { cn } from "@/shared/lib";
import { SheetClose } from "@/shared/ui";
import {
  hasActiveMegaMenuLink,
  isMegaMenuLinkActive,
  isStandaloneNavActive,
} from "../lib/mega-menu-active";

export function MegaMenuMobile() {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null,
  );
  const pathname = usePathname();

  const handleToggle = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const standaloneActive = isStandaloneNavActive(
    MEGA_MENU_STANDALONE_LINK.href,
    pathname,
  );

  return (
    <div className="flex flex-col gap-1">
      {MEGA_MENU_LINKS.map((category) => {
        const isExpanded = expandedCategoryId === category.id;
        const isCurrentCategory = hasActiveMegaMenuLink(category, pathname);
        const isButtonActive = isExpanded || isCurrentCategory;

        return (
          <div key={category.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => handleToggle(category.id)}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[16px] font-medium transition",
                isButtonActive
                  ? "bg-white/10 text-white"
                  : "text-white/75 hover:bg-white/6",
              )}
            >
              {category.label}
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 mt-1 flex flex-col gap-4 border-l border-white/10 py-3 pl-4">
                    {category.columns?.map((column) => {
                      const ColumnIcon = column.icon;
                      return (
                        <div key={column.title} className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 px-2">
                            {ColumnIcon && (
                              <ColumnIcon className="h-3.5 w-3.5 text-sky-400/60" />
                            )}
                            <p className="text-[11px] font-bold uppercase tracking-widest text-white/35">
                              {column.title}
                            </p>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {column.links.map((link) => {
                              const LinkIcon = link.icon;
                              const isCurrentLink = isMegaMenuLinkActive(
                                link.href,
                                pathname,
                              );
                              const rowClass = cn(
                                "flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition",
                                isCurrentLink
                                  ? "bg-sky-400/10 font-semibold text-white"
                                  : "text-white/70 hover:bg-white/6",
                              );
                              const rowInner = (
                                <>
                                  <div className="flex items-center gap-3">
                                    {LinkIcon && (
                                      <LinkIcon
                                        className={cn(
                                          "h-4 w-4 text-white/35",
                                          isCurrentLink && "text-sky-300",
                                        )}
                                      />
                                    )}
                                    <span>{link.title}</span>
                                  </div>
                                  {link.hasArrow && (
                                    <MoveRight className="h-4 w-4 text-sky-300" />
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
                                    className={rowClass}
                                  >
                                    {rowInner}
                                  </a>
                                );
                              }

                              return (
                                <SheetClose asChild key={link.title}>
                                  <Link href={link.href} className={rowClass}>
                                    {rowInner}
                                  </Link>
                                </SheetClose>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <SheetClose asChild>
        <Link
          href={MEGA_MENU_STANDALONE_LINK.href}
          className={cn(
            "rounded-xl px-4 py-3.5 text-[16px] font-medium transition",
            standaloneActive
              ? "bg-white/10 text-white"
              : "text-white/75 hover:bg-white/6",
          )}
        >
          {MEGA_MENU_STANDALONE_LINK.label}
        </Link>
      </SheetClose>
    </div>
  );
}
