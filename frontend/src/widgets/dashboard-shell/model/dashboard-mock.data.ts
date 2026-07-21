import type { PlatformRole } from "@/entities/session";

export type RequestStatus = "new" | "in_progress" | "closed";
export type ContentStatus = "draft" | "review" | "published" | "archived";
export type SystemStatus = "ok" | "warning" | "error";

export const mockAdminStats = [
  {
    label: "Новые пользователи",
    value: "24",
    hint: "за 7 дней",
    trend: "+12%",
  },
  { label: "Заявки консультаций", value: "8", hint: "новые", trend: "+3" },
  {
    label: "Черновики журнала",
    value: "5",
    hint: "на модерации",
    trend: "2 review",
  },
  {
    label: "Активные подписки",
    value: "142",
    hint: "пользователей",
    trend: "+8%",
  },
];

export const mockSystemStatuses = [
  {
    name: "API",
    status: "ok" as SystemStatus,
    detail: "akyl-backend.vercel.app",
  },
  { name: "Supabase", status: "ok" as SystemStatus, detail: "Connected" },
  { name: "Telegram", status: "warning" as SystemStatus, detail: "Mock mode" },
];

export const mockConsultationRequests = [
  {
    id: "req_001",
    name: "Заир К.",
    organization: "ОСИ дома №12",
    role: "ОСИ",
    email: "zair@example.kz",
    status: "new" as RequestStatus,
    createdAt: "2026-06-05",
    message: "Нужна консультация по внедрению KPI",
  },
  {
    id: "req_002",
    name: "Алма Т.",
    organization: "УК «Город»",
    role: "Управляющая компания",
    email: "alma@uk.kz",
    status: "in_progress" as RequestStatus,
    createdAt: "2026-06-04",
    message: "Аудит процессов управления МЖД",
  },
  {
    id: "req_003",
    name: "Ерлан М.",
    organization: "Акимат",
    role: "Акимат",
    email: "erlan@akimat.kz",
    status: "closed" as RequestStatus,
    createdAt: "2026-06-01",
    message: "Пилотная программа AKYL",
  },
  {
    id: "req_004",
    name: "Дина С.",
    organization: "Совет дома",
    role: "ОСИ",
    email: "dina@mail.kz",
    status: "new" as RequestStatus,
    createdAt: "2026-06-05",
    message: "Прозрачность финансов и отчётность",
  },
];

export const mockUsers = [
  {
    id: "u1",
    name: "Асылбек Нурланов",
    email: "admin@akyl.kz",
    role: "admin" as PlatformRole,
    status: "active",
    createdAt: "2025-11-10",
  },
  {
    id: "u2",
    name: "Мадина Алиева",
    email: "madina@akyl.kz",
    role: "journalist" as PlatformRole,
    status: "active",
    createdAt: "2026-01-15",
  },
  {
    id: "u3",
    name: "Серик Б.",
    email: "serik@uk.kz",
    role: "user" as PlatformRole,
    status: "active",
    createdAt: "2026-03-02",
  },
  {
    id: "u4",
    name: "Айгуль К.",
    email: "aigul@osi.kz",
    role: "user" as PlatformRole,
    status: "active",
    createdAt: "2026-04-18",
  },
  {
    id: "u5",
    name: "Тест User",
    email: "blocked@test.kz",
    role: "user" as PlatformRole,
    status: "suspended",
    createdAt: "2026-02-01",
  },
];

export const mockRoleCards = [
  {
    role: "admin" as PlatformRole,
    title: "Admin",
    description: "Полный доступ к платформе, пользователям и контенту",
    permissions: [
      "users",
      "roles",
      "journal",
      "library",
      "requests",
      "settings",
    ],
  },
  {
    role: "journalist" as PlatformRole,
    title: "Journalist",
    description: "Создание и редактирование материалов журнала",
    permissions: ["articles", "issues", "media", "profile"],
  },
  {
    role: "user" as PlatformRole,
    title: "User",
    description: "Доступ к профилю, подпискам и материалам",
    permissions: ["profile", "materials", "subscription"],
  },
];

export const mockPermissionMatrix = [
  { feature: "Пользователи", admin: true, journalist: false, user: false },
  { feature: "Роли", admin: true, journalist: false, user: false },
  { feature: "Журнал (CMS)", admin: true, journalist: true, user: false },
  { feature: "Библиотека (CMS)", admin: true, journalist: false, user: false },
  {
    feature: "Заявки консультаций",
    admin: true,
    journalist: false,
    user: false,
  },
  { feature: "Мои материалы", admin: false, journalist: false, user: true },
  { feature: "Подписка", admin: false, journalist: false, user: true },
];

export const mockJournalIssues = [
  {
    id: "01",
    title: "Индекс эффективности управления МЖД",
    status: "published" as ContentStatus,
    year: "2026",
  },
  {
    id: "02",
    title: "Цифровизация управления домом",
    status: "published" as ContentStatus,
    year: "2026",
  },
  {
    id: "03",
    title: "Финансовая устойчивость МЖД",
    status: "review" as ContentStatus,
    year: "2026",
  },
  {
    id: "04",
    title: "Профессиональное управление и стандарты",
    status: "draft" as ContentStatus,
    year: "2026",
  },
  {
    id: "05",
    title: "Энергоэффективная модернизация",
    status: "archived" as ContentStatus,
    year: "2025",
  },
];

export const mockLibraryItems = [
  {
    id: "l1",
    title: "Введение в профессиональное управление",
    type: "article",
    topic: "Модель управления",
  },
  {
    id: "l2",
    title: "Бенчмаркинг KPI в Центральной Азии",
    type: "research",
    topic: "KPI",
  },
  {
    id: "l3",
    title: "Шаблон финансового отчёта",
    type: "template",
    topic: "Финансы",
  },
  { id: "l4", title: "Методология AKYL", type: "book", topic: "Методология" },
];

export const mockStudioStats = [
  { label: "Черновики", value: "3", hint: "статьи" },
  { label: "На модерации", value: "2", hint: "ожидают review" },
  { label: "Опубликовано", value: "12", hint: "за месяц" },
  { label: "Просмотры", value: "4.2k", hint: "за 30 дней" },
];

export const mockArticles = [
  {
    id: "a1",
    title: "KPI управляющей компании: базовый набор",
    status: "draft" as ContentStatus,
    issue: "04",
    updated: "2026-06-05",
  },
  {
    id: "a2",
    title: "Финансовая прозрачность для ОСИ",
    status: "review" as ContentStatus,
    issue: "03",
    updated: "2026-06-04",
  },
  {
    id: "a3",
    title: "Цифровой контроль заявок жителей",
    status: "published" as ContentStatus,
    issue: "02",
    updated: "2026-05-28",
  },
  {
    id: "a4",
    title: "Энергоаудит МКД: с чего начать",
    status: "draft" as ContentStatus,
    issue: "05",
    updated: "2026-06-03",
  },
];

export const mockMediaFiles = [
  { id: "m1", name: "cover-issue-04.jpg", size: "420 KB", folder: "Covers" },
  { id: "m2", name: "chart-kpi-inline.png", size: "128 KB", folder: "Inline" },
  { id: "m3", name: "akyl-journal-03.pdf", size: "2.4 MB", folder: "PDF" },
];

export const mockUserMaterials = [
  {
    id: "um1",
    title: "Шаблон ежемесячного финансового отчёта",
    type: "template",
    saved: true,
  },
  {
    id: "um2",
    title: "Индекс эффективности управления МЖД",
    type: "article",
    saved: true,
  },
  {
    id: "um3",
    title: "Выпуск 03 — Финансовая устойчивость",
    type: "journal",
    saved: false,
  },
];

export const mockSubscriptions = [
  {
    id: "sub1",
    name: "Журнал AKYL",
    status: "active",
    expires: "2026-12-31",
    description: "Доступ ко всем выпускам журнала",
  },
  {
    id: "sub2",
    name: "Библиотека Pro",
    status: "none",
    expires: null,
    description: "Шаблоны, исследования и закрытые материалы",
  },
];

export const mockAccessibleMaterials = [
  { id: "am1", title: "Выпуск 01 — IEU", access: "open" },
  { id: "am2", title: "Выпуск 04 — Стандарты", access: "locked" },
  { id: "am3", title: "Исследование KPI региона", access: "open" },
];
