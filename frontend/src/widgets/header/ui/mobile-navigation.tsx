"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/shared/lib";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/shared/ui";
import { PublicUserMenu } from "@/widgets/dashboard-shell";
import { HOME_LOGO_URL } from "@/widgets/home-page";
import { MegaMenuMobile } from "./mega-menu-mobile";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white xl:hidden"
          aria-label="Открыть меню"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "w-full max-w-md border-white/10 bg-[#060b14] text-white",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                src={HOME_LOGO_URL}
                alt="AKYL"
                width={140}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <SheetClose asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-white/80 hover:bg-white/10"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>

          <p className="sr-only">Навигация по сайту</p>

          <div className="flex-1 overflow-y-auto py-4">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-widest text-white/35">
              Меню
            </p>
            <MegaMenuMobile />
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
            <div className="flex justify-center">
              <PublicUserMenu />
            </div>
            <SheetClose asChild>
              <Link
                href="/consultation"
                className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
              >
                Консультация
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
