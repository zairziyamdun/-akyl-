"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  SIDEBAR_ICON_SIZE,
  SIDEBAR_LABEL,
  sidebarIconWrapperClass,
  sidebarItemClass,
  sidebarItemStyle,
} from "./sidebarStyles";
import { dashColors } from "./sidebarTheme";

type SidebarItemContentProps = {
  active: boolean;
  collapsed: boolean;
  label: string;
  icon?: LucideIcon;
  iconContent?: ReactNode;
  trailing?: ReactNode;
};

function SidebarItemContent({
  active,
  collapsed,
  label,
  icon: Icon,
  iconContent,
  trailing,
}: SidebarItemContentProps) {
  return (
    <>
      <span className={sidebarIconWrapperClass(active)}>
        {iconContent ??
          (Icon ? <Icon className={SIDEBAR_ICON_SIZE} strokeWidth={active ? 2.25 : 2} /> : null)}
      </span>
      {!collapsed ? (
        <>
          <span className={cn(SIDEBAR_LABEL, active ? "text-white" : "text-inherit")}>{label}</span>
          {trailing ? <span className="flex shrink-0 items-center">{trailing}</span> : null}
        </>
      ) : null}
    </>
  );
}

type SidebarItemCommonProps = SidebarItemContentProps & {
  tooltip?: string;
  suppressTooltip?: boolean;
  className?: string;
};

export type SidebarItemLinkProps = SidebarItemCommonProps & {
  as?: "link";
  href: string;
  onNavigate?: () => void;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

export type SidebarItemButtonProps = SidebarItemCommonProps & {
  as: "button";
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export type SidebarItemProps = SidebarItemLinkProps | SidebarItemButtonProps;

export const SidebarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, SidebarItemProps>(
  function SidebarItem(props, ref) {
    const {
      active,
      collapsed,
      label,
      icon,
      iconContent,
      trailing,
      tooltip,
      suppressTooltip = false,
      className,
      ...rest
    } = props;

    const itemClass = cn(sidebarItemClass(active, collapsed), className);
    const itemStyle = sidebarItemStyle(active);
    const ariaLabel = collapsed ? (tooltip ?? label) : undefined;

    const content = (
      <SidebarItemContent
        active={active}
        collapsed={collapsed}
        label={label}
        icon={icon}
        iconContent={iconContent}
        trailing={trailing}
      />
    );

    let node: ReactNode;

    if (props.as === "button") {
      const buttonProps = rest as Omit<SidebarItemButtonProps, keyof SidebarItemCommonProps | "as">;
      node = (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={buttonProps.type ?? "button"}
          aria-label={ariaLabel}
          className={itemClass}
          style={itemStyle}
          {...buttonProps}
        >
          {content}
        </button>
      );
    } else {
      const { href, onNavigate, ...linkRest } = rest as SidebarItemLinkProps;
      node = (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onNavigate}
          aria-label={ariaLabel}
          aria-current={active ? "page" : undefined}
          className={itemClass}
          style={itemStyle}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    if (collapsed && !suppressTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{node}</TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={12}
            className="border-0 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
            style={{ backgroundColor: dashColors.tooltipBg }}
          >
            {tooltip ?? label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return node;
  },
);

SidebarItem.displayName = "SidebarItem";
