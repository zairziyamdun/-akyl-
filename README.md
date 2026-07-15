# AKYL — платформа профессионального управления МЖД

AKYL — веб-платформа для популяризации и внедрения методологии профессионального управления многоквартирными жилыми домами (МЖД). Проект объединяет методологию, цифровые инструменты анализа, библиотеку знаний, журнал и личные кабинеты для разных ролей участников рынка.

Многоквартирный дом рассматривается не как объект обслуживания, а как управляемая система, где связаны процессы, финансы, участники, данные, KPI, отчётность и цифровой контроль.

## Возможности

### Публичная часть

| Раздел | Описание |
|--------|----------|
| [Главная](/) | Презентация платформы, методологии и направлений |
| [Управление МЖД](/mzhd) | Теория, архитектура, процессы, финансы, KPI, стандарты, роли |
| [Обучение](/education) | Образовательные материалы и программы |
| [Практика внедрения](/implementation) | Сценарии и этапы внедрения системы управления |
| [Акимат](/akimat) | Раздел для органов местного самоуправления |
| [База знаний](/library) | Библиотека материалов и [книг](/library/books) |
| [Журнал](/journal) | Публичные выпуски журнала AKYL с PDF-просмотром |
| [Консультация](/consultation) | Форма заявки на консультацию (с уведомлением в Telegram) |
| [Инструменты](/tools) | Калькуляторы и практические инструменты анализа |

### Цифровые инструменты

- **Индекс эффективности управления (IEU)** — интегральный показатель 0–100 по контурам: финансы, эксплуатация, сервис, подрядчики, управление.
- **Анализ бюджета** — план-факт, выявление отклонений и финансовых рисков.
- **Чек-листы** — интерактивный аудит процессов и регламентов.
- **Управленческий отчёт** — конструктор сводного отчёта с выводами и рекомендациями.
- **Шаблоны KPI** — справочник показателей для построения системы метрик.

### Личные кабинеты

Платформа поддерживает ролевую модель доступа:

| Роль | Кабинет | Назначение |
|------|---------|------------|
| `user` | `/app` | Базовый пользовательский кабинет |
| `journalist` | `/studio` | Редакция журнала: выпуски, статьи, медиа |
| `manager` | `/manager` | Управление домами и дашборды |
| `admin` | `/admin` | Администрирование: пользователи, дома, журнал, заявки |

Доступ к защищённым маршрутам проверяется в Next.js middleware и на backend через JWT Supabase Auth.

### Операционные модули backend

- **Аутентификация** — регистрация, вход, профиль, роли.
- **Дома** — CRUD домов, дашборд, привязка пользователей.
- **Финансы** — учёт финансовых записей по дому.
- **Журнал** — жизненный цикл выпусков (черновик → отправка → публикация → архив), загрузка обложек и PDF в Supabase Storage.
- **Консультации** — приём заявок с сайта.
- **Администрирование** — управление ролями и статусами пользователей.

## Технологии

### Frontend (`frontend/`)

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS 4
- Framer Motion, Recharts, Lucide React
- Radix UI, react-pdf
- Biome (lint/format)
- Архитектура: Feature-Sliced Design (`app`, `widgets`, `features`, `entities`, `shared`)

### Backend (`backend/`)

- Node.js, Express, TypeScript
- Supabase (Auth, PostgreSQL, Storage)
- Zod (валидация), Multer (загрузка файлов)
- Опционально: Telegram Bot API для уведомлений о заявках

## Структура проекта

```text
.
├── frontend/
│   ├── src/
│   │   ├── app/              # маршруты Next.js (публичные и кабинеты)
│   │   ├── widgets/          # составные UI-блоки страниц
│   │   ├── features/         # пользовательские сценарии (auth, журнал, бюджет…)
│   │   ├── entities/         # доменные сущности (house, session, journal-issue…)
│   │   └── shared/           # UI-kit, конфиг, утилиты
│   ├── public/
│   ├── middleware.ts         # защита /app, /studio, /admin, /manager
│   └── package.json
│
└── backend/
    ├── api/index.ts          # точка входа для Vercel Serverless
    ├── src/
    │   ├── app.ts            # Express-приложение и маршруты API
    │   ├── config/           # env, Supabase client
    │   ├── middleware/       # auth, validation, errors
    │   ├── modules/          # auth, houses, finance, journal, consultation, admin
    │   ├── routes/           # health check
    │   └── services/         # telegram, health
    ├── .env.example
    └── package.json
```

## Быстрый старт

### Требования

- Node.js 20+
- pnpm (рекомендуется для frontend)
- Проект Supabase с настроенными таблицами и Storage

### 1. Backend

```bash
cd backend
cp .env.example .env
# заполните переменные окружения
pnpm install   # или npm install
pnpm dev       # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
pnpm install
# создайте .env.local (см. ниже)
pnpm dev       # http://localhost:3000
```

### Переменные окружения

**Backend** (`backend/.env`):

| Переменная | Описание |
|------------|----------|
| `PORT` | Порт API (по умолчанию `4000`) |
| `NODE_ENV` | `development` / `production` |
| `SUPABASE_URL` | URL проекта Supabase (без `/rest/v1`) |
| `SUPABASE_SERVICE_ROLE_KEY` или `SUPABASE_SECRET_KEY` | Сервисный ключ Supabase |
| `FRONTEND_URL` | Разрешённые origin для CORS (через запятую) |
| `TELEGRAM_BOT_TOKEN` | Опционально: токен бота для уведомлений |
| `TELEGRAM_CHAT_ID` | Опционально: ID чата для уведомлений |

**Frontend** (`frontend/.env.local`):

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_API_URL` | URL backend API (например `http://localhost:4000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase для изображений из Storage |

## API

Базовый префикс: `/api`

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/health` | Проверка состояния сервиса |
| `POST` | `/api/auth/register` | Регистрация |
| `POST` | `/api/auth/login` | Вход |
| `GET` | `/api/auth/me` | Текущий пользователь |
| `PATCH` | `/api/auth/profile` | Обновление профиля |
| `POST` | `/api/auth/logout` | Выход |
| `GET/POST/PATCH/DELETE` | `/api/houses` | Управление домами |
| `GET` | `/api/houses/:id/dashboard` | Данные дашборда дома |
| `GET/POST/PATCH/DELETE` | `/api/houses/:houseId/finance` | Финансовые записи |
| `GET/POST/PATCH/DELETE` | `/api/houses/:houseId/users` | Участники дома |
| `GET/POST/PATCH/DELETE` | `/api/journal/issues` | Выпуски журнала |
| `POST` | `/api/journal/upload-cover` | Загрузка обложки |
| `POST` | `/api/journal/upload-pdf` | Загрузка PDF |
| `POST` | `/api/consultation` | Заявка на консультацию |
| `GET` | `/api/admin/users` | Список пользователей (admin) |
| `PATCH` | `/api/admin/users/:id/role` | Смена роли (admin) |
| `PATCH` | `/api/admin/users/:id/status` | Смена статуса (admin) |

## Скрипты

**Frontend:**

```bash
pnpm dev          # dev-сервер
pnpm build        # production-сборка
pnpm start        # запуск production
pnpm lint         # проверка Biome
pnpm lint:fix     # автоисправление
```

**Backend:**

```bash
pnpm dev          # tsx watch
pnpm build        # компиляция TypeScript
pnpm start        # node dist/src/index.js
```

## Деплой

- **Frontend** — Next.js, совместим с Vercel и аналогичными платформами.
- **Backend** — конфигурация `backend/vercel.json` для serverless-деплоя через `api/index.ts`.

При деплое убедитесь, что `NEXT_PUBLIC_API_URL` указывает на production API, а `FRONTEND_URL` на backend включает домен фронтенда.

## Лицензия

Проект является частным (`private` в `package.json`). Уточняйте условия использования у правообладателя.
