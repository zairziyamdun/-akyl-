import type { MegaMenuCategory } from "@/shared/consts";

const normalizeHref = (href: string) => href.split("#")[0].split("?")[0] || "/";

export function isMegaMenuLinkActive(href: string, pathname: string) {
  if (href.startsWith("http")) {
    return false;
  }

  const normalizedHref = normalizeHref(href);

  if (normalizedHref === "/") {
    return pathname === "/";
  }

  return (
    pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`)
  );
}

export function hasActiveMegaMenuLink(
  category: MegaMenuCategory,
  pathname: string,
) {
  const links =
    category.links ?? category.columns?.flatMap((column) => column.links) ?? [];

  return links.some((link) => isMegaMenuLinkActive(link.href, pathname));
}

export function isStandaloneNavActive(href: string, pathname: string) {
  return isMegaMenuLinkActive(href, pathname);
}
