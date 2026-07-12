import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/shared/lib";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  rightIcon?: ReactNode;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  rightIcon,
  children,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const mergedClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none",
    size === "md" ? "h-11 px-5 text-sm" : "h-9 px-4 text-sm",
    variant === "primary" &&
      "bg-slate-900 text-white hover:bg-slate-800",
    variant === "secondary" &&
      "bg-white text-slate-900 ring-1 ring-black/10 hover:bg-slate-50",
    variant === "ghost" &&
      "bg-transparent text-slate-900 hover:bg-slate-100",
    variant === "link" &&
      "h-auto px-0 text-slate-900 underline-offset-4 hover:underline",
    className,
  );

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error("Button with asChild expects a single React element child.");
    }
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...props,
      className: cn(mergedClassName, child.props.className),
    });
  }

  return (
    <button type={type} className={mergedClassName} {...props}>
      <span>{children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}

