"use client";

import { motion } from "framer-motion";
import { Building2, ChevronDown, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { House } from "@/entities/house";
import type { AkylRole } from "@/entities/session";
import { getHouseNavHref } from "@/shared/hooks/useUserHouses";
import { cn } from "@/shared/lib";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { SIDEBAR_MOTION_TRANSITION } from "../../model/sidebarNavUtils";
import {
  SIDEBAR_SUB_NAV_INDENT,
  sidebarSubLinkClass,
  sidebarSubLinkDotClass,
} from "../../model/sidebarStyles";
import { dashColors, sidebarActiveGradient } from "../../model/sidebarTheme";
import { SidebarItem } from "./SidebarItem";

type HousesTreeProps = {
  houses: House[];
  loading: boolean;
  role: AkylRole;
  onNavigate?: () => void;
  compact?: boolean;
};

function HousesTree({
  houses,
  loading,
  role,
  onNavigate,
  compact = false,
}: HousesTreeProps) {
  const pathname = usePathname();

  if (loading) {
    return (
      <div
        className={cn(
          "space-y-1 py-1",
          compact ? "px-2" : SIDEBAR_SUB_NAV_INDENT,
        )}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-[#E2E8F0]" />
        ))}
      </div>
    );
  }

  if (houses.length === 0) {
    return (
      <p
        className={cn(
          "py-2 text-xs leading-5 text-[#94A3B8]",
          compact ? "px-3" : SIDEBAR_SUB_NAV_INDENT,
        )}
      >
        Нет доступных ЖК
      </p>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 py-1",
        compact ? "px-2" : SIDEBAR_SUB_NAV_INDENT,
      )}
    >
      {houses.map((house) => {
        const href = getHouseNavHref(role, house.id);
        const active = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={house.id}
            href={href}
            onClick={onNavigate}
            className={sidebarSubLinkClass(active)}
          >
            <span className={sidebarSubLinkDotClass(active)} aria-hidden />
            <span className="truncate">{house.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

function HousesPopover({
  label,
  listHref,
  houses,
  loading,
  role,
  onNavigate,
  onClose,
}: {
  label: string;
  listHref: string;
  houses: House[];
  loading: boolean;
  role: AkylRole;
  onNavigate?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="p-2">
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>
      <HousesTree
        houses={houses}
        loading={loading}
        role={role}
        compact
        onNavigate={() => {
          onClose();
          onNavigate?.();
        }}
      />
      <Link
        href={listHref}
        onClick={() => {
          onClose();
          onNavigate?.();
        }}
        className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-medium text-white transition hover:brightness-105"
        style={{
          background: sidebarActiveGradient,
          boxShadow: dashColors.activeShadow,
        }}
      >
        <Settings2 className="h-4 w-4" />
        Управление ЖК
      </Link>
    </div>
  );
}

type MyHousesNavProps = {
  label: string;
  listHref: string;
  role: AkylRole;
  houses: House[];
  loading: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function MyHousesNav({
  label,
  listHref,
  role,
  houses,
  loading,
  collapsed,
  onNavigate,
}: MyHousesNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(
    pathname.startsWith(listHref) || pathname.includes("/houses/"),
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const listActive =
    pathname === listHref ||
    pathname.startsWith(`${listHref}/`) ||
    houses.some((house) => {
      const href = getHouseNavHref(role, house.id);
      return pathname === href || pathname.startsWith(`${href}/`);
    });

  const chevron = (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={SIDEBAR_MOTION_TRANSITION}
      className={cn(listActive ? "text-white/80" : "text-[#94A3B8]")}
    >
      <ChevronDown className="h-4 w-4 shrink-0" />
    </motion.span>
  );

  if (collapsed) {
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <SidebarItem
            as="button"
            type="button"
            label={label}
            icon={Building2}
            active={listActive}
            collapsed
            suppressTooltip
            aria-expanded={popoverOpen}
          />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={12}
          className="w-60 border-[#E2E8F0] bg-white p-0 shadow-xl"
        >
          <HousesPopover
            label={label}
            listHref={listHref}
            houses={houses}
            loading={loading}
            role={role}
            onNavigate={onNavigate}
            onClose={() => setPopoverOpen(false)}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <SidebarItem
          as="button"
          type="button"
          label={label}
          icon={Building2}
          active={listActive}
          collapsed={false}
          trailing={chevron}
          aria-expanded={open}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="grid overflow-hidden transition-all duration-250 ease-in-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]">
        <div className="min-h-0 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={SIDEBAR_MOTION_TRANSITION}
          >
            <HousesTree
              houses={houses}
              loading={loading}
              role={role}
              onNavigate={onNavigate}
            />
            <Link
              href={listHref}
              onClick={onNavigate}
              className={cn(
                "flex h-9 items-center gap-2 text-xs font-semibold leading-5 text-[#0c1e3a] transition hover:text-[#2563EB]",
                SIDEBAR_SUB_NAV_INDENT,
              )}
            >
              <Settings2 className="h-3.5 w-3.5 shrink-0" />
              Управление ЖК
            </Link>
          </motion.div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { isHousesNavHref } from "../../model/sidebarNavUtils";
