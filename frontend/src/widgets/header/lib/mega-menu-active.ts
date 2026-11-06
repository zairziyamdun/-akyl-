import {
  MEGA_MENU_LINKS,
  MEGA_MENU_STANDALONE_LINKS,
  type MegaMenuCategory,
} from "@/shared/consts";

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

/** Key of a top-level header item: a category id or a standalone link href. */
type NavItemKey = string;

/**
 * The single header item that owns the current page: the one with the most
 * specific (longest) matching link. Cross links never claim a page, so a page
 * reachable from several menus still highlights only one top-level item.
 */
export function resolveActiveNavItem(pathname: string): NavItemKey | null {
  const candidates: Array<{ key: NavItemKey; href: string }> = [
    ...MEGA_MENU_LINKS.flatMap((category) =>
      (category.links ?? category.columns?.flatMap((c) => c.links) ?? [])
        .filter((link) => !link.crossLink)
        .map((link) => ({ key: category.id, href: link.href })),
    ),
    ...MEGA_MENU_STANDALONE_LINKS.map((link) => ({
      key: link.href,
      href: link.href,
    })),
  ];

  let best: { key: NavItemKey; length: number } | null = null;
  for (const { key, href } of candidates) {
    if (!isMegaMenuLinkActive(href, pathname)) continue;
    const length = normalizeHref(href).length;
    if (!best || length > best.length) best = { key, length };
  }
  return best?.key ?? null;
}

export function hasActiveMegaMenuLink(
  category: MegaMenuCategory,
  pathname: string,
) {
  return resolveActiveNavItem(pathname) === category.id;
}

export function isStandaloneNavActive(href: string, pathname: string) {
  return resolveActiveNavItem(pathname) === href;
}
