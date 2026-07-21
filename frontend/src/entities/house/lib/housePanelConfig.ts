import type { HouseRole } from "../model/types";

/** Sidebar group ids for the ЖК workspace (house layout only). */
export type HouseSidebarGroupId =
  | "main"
  | "residents_work"
  | "finance"
  | "technical"
  | "management"
  | "documents";

export const HOUSE_SIDEBAR_GROUP_LABELS: Record<HouseSidebarGroupId, string> = {
  main: "Главное",
  residents_work: "Работа с жителями",
  finance: "Финансы",
  technical: "Техническая эксплуатация",
  management: "Настройки",
  documents: "Документы",
};

export const HOUSE_SIDEBAR_GROUP_ORDER: readonly HouseSidebarGroupId[] = [
  "main",
  "residents_work",
  "finance",
  "technical",
  "documents",
  "management",
];

export type HousePanelId =
  | "overview"
  | "efficiency"
  | "analytics"
  | "my-home"
  | "residents"
  | "staff"
  | "votings"
  | "announcements"
  | "finance"
  | "budget"
  | "charges"
  | "payments"
  | "debts"
  | "requests"
  | "equipment"
  | "planned-works"
  | "technical"
  | "members"
  | "settings"
  | "documents"
  | "reports";

/**
 * Single source of truth for ЖК workspace panels.
 * Paths are relative to `/app/houses/:houseId/`.
 */
export type HousePanelConfig = {
  id: HousePanelId;
  title: string;
  path: string;
  icon?: string;
  section: HouseSidebarGroupId;
  sectionByRole?: Partial<Record<HouseRole, HouseSidebarGroupId>>;
  roles: readonly HouseRole[];
  navigation?: boolean;
  dashboard?: boolean;
  quickAction?: boolean;
  description?: string;
};

export const HOUSE_CABINET_BASE = "/app/houses";

export function houseCabinetBase(houseId: string): string {
  return `${HOUSE_CABINET_BASE}/${houseId}`;
}

export const HOUSE_PANELS: readonly HousePanelConfig[] = [
  {
    id: "overview",
    title: "Обзор",
    path: "overview",
    icon: "◫",
    section: "main",
    roles: ["chairman", "manager", "accountant", "engineer", "dispatcher"],
    navigation: true,
    dashboard: true,
    description: "KPI и сводка по выбранному ЖК",
  },
  {
    id: "efficiency",
    title: "Индекс эффективности",
    path: "efficiency",
    icon: "◈",
    section: "main",
    roles: ["chairman", "manager"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "analytics",
    title: "Аналитика",
    path: "analytics",
    icon: "▤",
    section: "main",
    roles: ["chairman", "manager"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "my-home",
    title: "Мой дом",
    path: "my-home",
    icon: "⌂",
    section: "main",
    roles: ["resident"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "residents",
    title: "Жители",
    path: "residents",
    icon: "◎",
    section: "residents_work",
    roles: ["chairman", "manager"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "staff",
    title: "Сотрудники",
    path: "staff",
    icon: "◎",
    section: "residents_work",
    roles: ["chairman", "manager"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "votings",
    title: "Голосования",
    path: "votings",
    icon: "✓",
    section: "residents_work",
    roles: ["chairman", "resident"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "announcements",
    title: "Объявления",
    path: "announcements",
    icon: "✦",
    section: "residents_work",
    roles: ["resident"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "finance",
    title: "Финансы",
    path: "finance",
    icon: "₽",
    section: "finance",
    roles: ["chairman", "manager", "accountant"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "budget",
    title: "Бюджет",
    path: "budget",
    icon: "₽",
    section: "finance",
    roles: ["chairman", "manager", "accountant"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "charges",
    title: "Начисления",
    path: "charges",
    icon: "₽",
    section: "finance",
    sectionByRole: { resident: "main" },
    roles: ["chairman", "accountant", "resident"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "payments",
    title: "Платежи",
    path: "payments",
    icon: "₽",
    section: "finance",
    sectionByRole: { resident: "main" },
    roles: ["chairman", "accountant", "resident"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "debts",
    title: "Задолженности",
    path: "debts",
    icon: "₽",
    section: "finance",
    sectionByRole: { resident: "main" },
    roles: ["chairman", "accountant", "resident"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "requests",
    title: "Заявки",
    path: "requests",
    icon: "✉",
    section: "technical",
    sectionByRole: { resident: "main" },
    roles: ["chairman", "manager", "engineer", "dispatcher", "resident"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "equipment",
    title: "Оборудование",
    path: "equipment",
    icon: "⚒",
    section: "technical",
    roles: ["chairman", "manager", "engineer"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "planned-works",
    title: "Плановые работы",
    path: "planned-works",
    icon: "⚒",
    section: "technical",
    roles: ["chairman", "manager", "engineer"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "technical",
    title: "Техника",
    path: "technical",
    icon: "⚒",
    section: "technical",
    roles: ["engineer"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "documents",
    title: "Документы",
    path: "documents",
    icon: "▣",
    section: "documents",
    roles: ["chairman", "manager", "accountant", "engineer", "resident"],
    navigation: true,
    dashboard: true,
  },
  {
    id: "reports",
    title: "Отчеты",
    path: "reports",
    icon: "▤",
    section: "documents",
    roles: ["chairman", "manager", "accountant"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "members",
    title: "Участники",
    path: "members",
    icon: "◎",
    section: "management",
    roles: ["chairman"],
    navigation: true,
    dashboard: true,
    quickAction: true,
  },
  {
    id: "settings",
    title: "Настройки ЖК",
    path: "settings",
    icon: "⚙",
    section: "management",
    roles: ["chairman"],
    navigation: true,
  },
];

export function getHousePanel(id: HousePanelId): HousePanelConfig | undefined {
  return HOUSE_PANELS.find((panel) => panel.id === id);
}

export function buildHousePanelHref(
  houseId: string,
  panelId: HousePanelId,
): string {
  const panel = getHousePanel(panelId);
  if (!panel) return `${houseCabinetBase(houseId)}/overview`;
  return `${houseCabinetBase(houseId)}/${panel.path}`;
}

export function getPanelSectionForRole(
  panel: HousePanelConfig,
  role: HouseRole,
): HouseSidebarGroupId {
  return panel.sectionByRole?.[role] ?? panel.section;
}

export function canAccessHousePanel(
  role: HouseRole,
  panelId: HousePanelId,
): boolean {
  const panel = getHousePanel(panelId);
  return panel ? panel.roles.includes(role) : false;
}

export function getHousePanelsForRole(
  role: HouseRole,
): readonly HousePanelConfig[] {
  return HOUSE_PANELS.filter((panel) => panel.roles.includes(role));
}

export function getNavigationPanelsForRole(
  role: HouseRole,
): readonly HousePanelConfig[] {
  return getHousePanelsForRole(role).filter(
    (panel) => panel.navigation !== false,
  );
}

export function getDashboardPanelsForRole(
  role: HouseRole,
): readonly HousePanelConfig[] {
  return getHousePanelsForRole(role).filter((panel) => panel.dashboard);
}

export function getQuickActionPanelsForRole(
  role: HouseRole,
): readonly HousePanelConfig[] {
  return getHousePanelsForRole(role).filter((panel) => panel.quickAction);
}

/** True for `/app/houses/:id` and nested workspace paths (not the list). */
export function isHouseWorkspacePath(pathname: string): boolean {
  return /^\/app\/houses\/[^/]+(\/|$)/.test(pathname);
}

export function extractHouseIdFromPathname(pathname: string): string | null {
  const match = pathname.match(/^\/app\/houses\/([^/]+)/);
  if (!match?.[1]) return null;
  return match[1];
}

export function resolveHousePanelFromPathname(
  pathname: string,
): HousePanelId | null {
  if (
    pathname === HOUSE_CABINET_BASE ||
    pathname === `${HOUSE_CABINET_BASE}/`
  ) {
    return null;
  }

  const match = pathname.match(/^\/app\/houses\/([^/]+)(?:\/([^/]+))?/);
  if (!match) {
    // Legacy /manager compatibility
    const legacy = pathname.match(/^\/manager\/houses\/([^/]+)(?:\/([^/]+))?/);
    if (legacy?.[2]) {
      return HOUSE_PANELS.find((p) => p.path === legacy[2])?.id ?? null;
    }
    return null;
  }

  const segment = match[2];
  if (!segment) return "overview";
  return HOUSE_PANELS.find((p) => p.path === segment)?.id ?? null;
}
