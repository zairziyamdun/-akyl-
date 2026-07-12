import type { AkylRole } from "@/entities/session";

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const adminNav: NavSection[] = [
  {
    items: [{ label: "Обзор", href: "/admin", icon: "◫" }],
  },
  {
    title: "Управление",
    items: [
      { label: "Мои ЖК", href: "/admin/houses", icon: "⌂" },
      { label: "Пользователи", href: "/admin/users", icon: "◎" },
      { label: "Роли", href: "/admin/roles", icon: "◈" },
      { label: "Заявки", href: "/admin/requests", icon: "✉" },
    ],
  },
  {
    title: "Контент",
    items: [
      { label: "Журнал", href: "/admin/journal", icon: "▤" },
      { label: "Создать выпуск", href: "/admin/journal/new", icon: "＋" },
      { label: "Библиотека", href: "/admin/library", icon: "▣" },
    ],
  },
  {
    title: "Система",
    items: [
      { label: "Профиль", href: "/admin/profile", icon: "◎" },
      { label: "Настройки", href: "/admin/settings", icon: "⚙" },
    ],
  },
];

export const studioNav: NavSection[] = [
  {
    items: [{ label: "Обзор", href: "/studio", icon: "◫" }],
  },
  {
    title: "Контент",
    items: [
      { label: "Журнал", href: "/studio/journal", icon: "▦" },
      { label: "Создать выпуск", href: "/studio/journal/new", icon: "＋" },
      { label: "Медиафайлы", href: "/studio/media", icon: "◻" },
    ],
  },
  {
    title: "Аккаунт",
    items: [{ label: "Профиль", href: "/studio/profile", icon: "◎" }],
  },
];

export const userNav: NavSection[] = [
  {
    items: [{ label: "Обзор", href: "/app", icon: "◫" }],
  },
  {
    title: "Аккаунт",
    items: [
      { label: "Профиль", href: "/app/profile", icon: "◎" },
      { label: "Мои материалы", href: "/app/materials", icon: "▣" },
      { label: "Подписка", href: "/app/subscription", icon: "★" },
    ],
  },
];

export const managerNav: NavSection[] = [
  {
    items: [
      { label: "Мои ЖК", href: "/manager/houses", icon: "⌂" },
      { label: "Профиль", href: "/app/profile", icon: "◎" },
    ],
  },
];

export function getNavForRole(role: AkylRole): NavSection[] {
  switch (role) {
    case "admin":
      return adminNav;
    case "manager":
      return managerNav;
    case "journalist":
      return studioNav;
    case "user":
      return userNav;
  }
}

export function getShellTitle(role: AkylRole): string {
  switch (role) {
    case "admin":
      return "Admin";
    case "manager":
      return "Мои ЖК";
    case "journalist":
      return "Studio";
    case "user":
      return "Кабинет";
  }
}

export function getShellBasePath(role: AkylRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "manager":
      return "/manager/houses";
    case "journalist":
      return "/studio";
    case "user":
      return "/app";
  }
}
