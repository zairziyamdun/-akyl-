# Техническое задание: Backend AKYL

**Версия:** 1.0  
**Дата:** 2026-06-05  
**Статус:** Draft  
**Область:** только backend (frontend не меняется в рамках этого ТЗ)

---

## 1. Цель и контекст

### 1.1. О проекте

AKYL — платформа профессионального управления многоквартирными жилыми домами (МЖД). Сайт объединяет:

- методологию управления МЖД;
- цифровые инструменты анализа (IEU, бюджет, чек-листы, отчёты);
- базу знаний и журнал;
- лендинги для УК, ОСИ, акиматов, обучения и консультаций.

### 1.2. Цель backend

Построить API-слой, который:

1. принимает и сохраняет пользовательские действия (заявки, подписки);
2. управляет контентом и файлами (библиотека, журнал);
3. в перспективе обеспечивает личный кабинет / dashboard для организаций;
4. остаётся простым monolith API на Express + Supabase на первых этапах.

### 1.3. Принципы

- **Frontend-first separation:** маркетинговые страницы и калькуляторы могут оставаться SSG/client-only, пока не требуют персистентности.
- **Supabase как БД и storage:** PostgreSQL + Storage + (позже) Auth.
- **Модульная структура:** `src/modules/<domain>/`.
- **Валидация через Zod** на входе каждого write-endpoint.
- **Без over-engineering:** auth, admin, subscriptions — только когда нужны конкретному модулю.

---

## 2. Текущее состояние

### 2.1. Frontend (Next.js 16, App Router)

#### Страницы (23 маршрута)

| Маршрут | Тип | Источник данных | Нужен backend |
|---------|-----|-----------------|---------------|
| `/` | Маркетинг | inline + `homePageContent.ts` | Нет (фаза 1) |
| `/mzhd` + 7 подстраниц | Маркетинг | `mzhd*Data.ts` | Нет (фаза 1) |
| `/implementation` | Маркетинг | inline в компонентах | Нет |
| `/akimat` | Маркетинг | `akimatData.ts` | Нет |
| `/education` | Маркетинг | `educationData.ts` | Фаза 3 (запись на курс) |
| `/consultation` | **Форма** | `consultationData.ts` | **Да — фаза 1** |
| `/journal` | Каталог + PDF | `journalData.ts` | **Да — фаза 2** |
| `/library` | Каталог | `libraryContent.ts` (~17 из 109) | **Да — фаза 2** |
| `/library/books` | Каталог | `books.ts` | Фаза 2 |
| `/tools/*` (5 инструментов) | Client calculators | `data/` + `lib/` | Фаза 4 (опционально) |
| `/test-akyl-dashboard` | Заглушка | — | **Да — фаза 5** |

#### Формы и интерактив без backend

| Компонент | Поведение сейчас | Поля |
|-----------|------------------|------|
| `ConsultationForm` | `preventDefault`, локальный success UI | name, phone, email, organization, role, message |
| `Footer` newsletter | `preventDefault`, очистка email | email |
| IEU / Budget / Checklists / Report | расчёт на клиенте, без сохранения | — |
| Journal locked issues | `isLocked: true` → ссылка на `/consultation` | — |

#### Расхождение frontend ↔ backend (важно)

| Поле | Frontend (`ConsultationForm`) | Backend (`consultation_requests`) |
|------|------------------------------|-----------------------------------|
| name | обязательно | обязательно ✅ |
| phone | обязательно | опционально ⚠️ |
| email | обязательно | опционально ⚠️ |
| organization | есть | **отсутствует** ❌ |
| role | обязательно (select) | опционально ⚠️ |
| message | обязательно | обязательно ✅ |

> При интеграции frontend нужно либо добавить колонку `organization`, либо маппить в `message`. Рекомендация для backend: **добавить `organization text`**.

---

### 2.2. Backend (текущая реализация)

**Стек:** Node.js, TypeScript, Express, Supabase JS, Zod, CORS, dotenv.

**Структура:**

```
backend/
├── src/
│   ├── config/supabase.ts       # singleton client
│   ├── routes/health.routes.ts
│   ├── controllers/health.controller.ts
│   ├── services/health.service.ts
│   ├── middleware/error.middleware.ts
│   ├── modules/consultation/    # первый бизнес-модуль
│   └── index.ts
├── docs/
│   ├── consultation_requests.sql
│   └── consultation_requests_permissions.sql
└── package.json
```

**Работающие endpoints:**

| Method | Path | Статус |
|--------|------|--------|
| GET | `/health` | ✅ |
| GET | `/health/supabase` | ✅ |
| POST | `/api/consultation` | ⚠️ реализован, требует GRANT в Supabase |

**Supabase client:**

- URL: `SUPABASE_URL` (нормализуется, убирается `/rest/v1`)
- Key: `SUPABASE_SERVICE_ROLE_KEY` → fallback `SUPABASE_SECRET_KEY`
- Формат ключа: `sb_secret_...` (новый) или JWT `eyJ...` (legacy service_role)
- Auth options: `autoRefreshToken: false`, `persistSession: false`

**Env:**

```env
PORT=4000
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=   # или SUPABASE_SECRET_KEY
FRONTEND_URL=http://localhost:3000
```

---

## 3. Целевая архитектура backend

### 3.1. Структура папок (целевая)

```
backend/
├── src/
│   ├── index.ts
│   ├── config/
│   │   ├── supabase.ts
│   │   └── env.ts                 # Zod-валидация env
│   ├── common/
│   │   ├── errors.ts              # AppError, ValidationError, DatabaseError
│   │   ├── response.ts            # единый формат ответов
│   │   └── async-handler.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── cors.middleware.ts
│   ├── modules/
│   │   ├── health/
│   │   ├── consultation/          # ✅ фаза 1
│   │   ├── newsletter/            # фаза 1
│   │   ├── journal/               # фаза 2
│   │   ├── library/               # фаза 2
│   │   ├── media/                 # фаза 2
│   │   ├── tools/                 # фаза 4 (опционально)
│   │   ├── auth/                  # фаза 5
│   │   ├── organizations/         # фаза 5
│   │   └── admin/                 # фаза 5+
│   └── types/
├── docs/
│   ├── BACKEND_TZ.md
│   └── sql/                       # миграции/SQL-скрипты
├── .env.example
└── package.json
```

### 3.2. Слои модуля

Каждый модуль:

```
modules/<name>/
  <name>.schema.ts      # Zod DTO
  <name>.service.ts     # бизнес-логика + Supabase
  <name>.controller.ts  # HTTP handlers
  <name>.routes.ts      # Express Router
```

### 3.3. Формат API-ответов

**Успех (write):**
```json
{ "success": true, "message": "...", "data": {} }
```

**Ошибка валидации (400):**
```json
{ "success": false, "message": "Validation error", "errors": [] }
```

**Ошибка БД (500):**
```json
{ "success": false, "message": "Database error" }
```

**Общая ошибка (500):**
```json
{ "status": "error", "message": "..." }
```

> На фазе 1 допустимо оставить текущий формат consultation. Унификация — фаза 1.5.

---

## 4. Модули и фазы разработки

### Фаза 1 — MVP: лиды и коммуникации (приоритет: ВЫСОКИЙ)

**Цель:** первая рабочая цепочка frontend → backend → Supabase.

#### 4.1. Consultation (частично готово)

**Таблица:** `consultation_requests`

```sql
create table consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  organization text,              -- добавить при интеграции с frontend
  role text,
  message text not null,
  status text not null default 'new',
  source text default 'consultation',
  created_at timestamptz default now()
);
```

**Статусы:** `new` | `in_progress` | `closed` | `spam`

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| POST | `/api/consultation` | Создать заявку ✅ |
| GET | `/api/consultation/:id` | Получить заявку (admin, фаза 5) |
| PATCH | `/api/consultation/:id/status` | Сменить статус (admin, фаза 5) |

**POST body (целевой, с organization):**
```json
{
  "name": "Заир",
  "phone": "+77001234567",
  "email": "test@test.com",
  "organization": "ОСИ дома №12",
  "role": "ОСИ",
  "message": "Нужна консультация"
}
```

**Задачи фазы 1:**
- [x] POST endpoint
- [x] Zod validation
- [x] Supabase insert
- [ ] Добавить колонку `organization`
- [ ] Синхронизировать required-поля с frontend (phone, email)
- [ ] Rate limiting (опционально: 5 req/min per IP)
- [ ] Логирование ошибок Supabase в dev

#### 4.2. Newsletter

**Таблица:** `newsletter_subscribers`

```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending',
  source text default 'footer',
  confirmed_at timestamptz,
  created_at timestamptz default now()
);
```

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| POST | `/api/newsletter/subscribe` | Подписка из Footer |

**Body:**
```json
{ "email": "user@example.com" }
```

**Ответ:** 201 `{ "success": true, "message": "Subscribed" }`

**Статусы:** `pending` | `active` | `unsubscribed`

---

### Фаза 2 — Контент и файлы (приоритет: СРЕДНИЙ)

**Цель:** заменить статические `data/*.ts` для библиотеки и журнала.

#### 4.3. Library (база знаний)

**Таблицы:**

```sql
create table library_topics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int default 0
);

create table library_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  type text not null,           -- article|research|regulation|template|video
  title text not null,
  description text,
  topic_id uuid references library_topics(id),
  read_time text,
  duration text,
  format text,
  file_url text,
  external_url text,
  published_at timestamptz,
  is_published boolean default false,
  download_count int default 0,
  created_at timestamptz default now()
);
```

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| GET | `/api/library/items` | Список с фильтрами (type, topic, search, page) |
| GET | `/api/library/items/:slug` | Карточка материала |
| GET | `/api/library/topics` | Список тем |
| POST | `/api/library/items/:id/download` | Инкремент счётчика + redirect/signed URL |

**Query params для списка:**
- `type` — article | research | regulation | template | video
- `topic` — slug темы
- `q` — поиск по title/description
- `page`, `limit`

#### 4.4. Journal

**Таблица:**

```sql
create table journal_issues (
  id uuid primary key default gen_random_uuid(),
  issue_number text not null unique,
  title text not null,
  subtitle text,
  description text,
  category text,
  year text,
  cover_image_url text,
  background_image_url text,
  pdf_storage_path text,
  is_locked boolean default false,
  published_at timestamptz,
  sort_order int default 0,
  created_at timestamptz default now()
);
```

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| GET | `/api/journal/issues` | Список выпусков |
| GET | `/api/journal/issues/:id` | Детали выпуска |
| GET | `/api/journal/issues/:id/pdf` | Signed URL для PDF (если не locked) |

**Логика доступа:**
- `is_locked = false` → отдаёт signed URL PDF из Supabase Storage
- `is_locked = true` → 403 `{ "success": false, "message": "Issue locked", "cta": "/consultation" }`

#### 4.5. Media / Storage

**Supabase Storage buckets:**

| Bucket | Назначение |
|--------|-----------|
| `journal-pdfs` | PDF выпусков журнала |
| `library-files` | шаблоны, документы, исследования |
| `media` | обложки, изображения |

**Endpoints (internal/service):**

| Method | Path | Описание |
|--------|------|----------|
| POST | `/api/media/upload` | Upload (admin only, фаза 5) |
| GET | `/api/media/:id/url` | Signed URL |

---

### Фаза 3 — Обучение (приоритет: НИЗКИЙ)

#### 4.6. Education

**Таблица:** `education_programs` (контент программ)

**Таблица:** `education_enrollments` (заявки на обучение)

```sql
create table education_enrollments (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null,
  name text not null,
  email text not null,
  phone text,
  organization text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);
```

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| GET | `/api/education/programs` | Список программ |
| POST | `/api/education/enrollments` | Заявка на обучение |

> На фазе 3 контент программ может оставаться в frontend `educationData.ts`. Backend нужен только для enrollments.

---

### Фаза 4 — Инструменты (опционально)

**Цель:** сохранять результаты калькуляторов для авторизованных пользователей / организаций.

#### 4.7. Tools snapshots

**Таблицы:**

```sql
create table ieu_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  organization_id uuid,
  input jsonb not null,
  result jsonb not null,
  total_score numeric,
  created_at timestamptz default now()
);

create table checklist_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  answers jsonb not null,
  score numeric,
  created_at timestamptz default now()
);

create table budget_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  period text,
  rows jsonb not null,
  summary jsonb,
  created_at timestamptz default now()
);
```

**Endpoints:**

| Method | Path | Описание |
|--------|------|----------|
| POST | `/api/tools/ieu` | Сохранить расчёт IEU |
| POST | `/api/tools/checklists` | Сохранить результат чек-листа |
| POST | `/api/tools/budget` | Сохранить снимок бюджета |
| GET | `/api/tools/ieu/:id` | Получить сохранённый расчёт |

> **Расчёт остаётся на frontend.** Backend только сохраняет input/output JSON.

---

### Фаза 5 — Auth, организации, dashboard (будущее)

#### 4.8. Auth

- Supabase Auth или custom JWT
- Роли: `guest`, `user`, `org_member`, `org_admin`, `platform_admin`

#### 4.9. Organizations

```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,    -- uk|osi|akimat|developer
  city text,
  created_at timestamptz default now()
);

create table organization_members (
  user_id uuid not null,
  organization_id uuid not null references organizations(id),
  role text not null default 'member',
  primary key (user_id, organization_id)
);
```

#### 4.10. Dashboard (`/test-akyl-dashboard`)

Endpoints для SaaS-кабинета:

| Method | Path | Описание |
|--------|------|----------|
| GET | `/api/dashboard/overview` | KPI дома/организации |
| GET | `/api/dashboard/ieu/history` | История IEU |
| GET | `/api/dashboard/buildings` | Список домов |

> Страница frontend сейчас — заглушка (`return null`). Backend проектируется заранее, реализация после MVP.

#### 4.11. Admin panel (API only)

| Method | Path | Описание |
|--------|------|----------|
| GET | `/api/admin/consultation` | Список заявок |
| PATCH | `/api/admin/consultation/:id` | Обновить статус |
| CRUD | `/api/admin/library/*` | Управление материалами |
| CRUD | `/api/admin/journal/*` | Управление выпусками |

---

## 5. Что остаётся frontend-only

| Модуль | Причина |
|--------|---------|
| Маркетинговые лендинги (МЖД, акimat, implementation, home) | редко меняются, SSG достаточно |
| KPI Templates (`/tools/kpi-templates`) | справочный контент |
| IEU / Budget / Checklists / Report calculators | расчёт на клиенте, мгновенный UX |
| UI, анимации, навигация | чистый frontend |

**Критерий:** backend нужен, если есть **персистентность, файлы, доступ, персональные данные или CMS**.

---

## 6. Нефункциональные требования

### 6.1. Безопасность

- Service role key **только на backend**, никогда в frontend
- CORS: только `FRONTEND_URL` (+ staging URL при деплое)
- Rate limit на public POST endpoints (consultation, newsletter)
- RLS в Supabase для public-таблиц; backend использует service role
- Sanitize/validate всех входных данных через Zod
- Signed URLs для PDF/файлов (TTL 15–60 мин)

### 6.2. Логирование

- Dev: полный лог ошибок Supabase (code, message, hint)
- Prod: structured logs без PII
- Request ID middleware (фаза 1.5)

### 6.3. Деплой

| Среда | Frontend | Backend |
|-------|----------|---------|
| Local | `:3000` | `:4000` |
| Staging | TBD | TBD |
| Prod | TBD | TBD |

**Env для prod:**
```env
PORT=4000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=https://akyl.kz
NODE_ENV=production
```

### 6.4. Производительность

- Pagination для library/journal lists (default limit: 20)
- Индексы: `consultation_requests.created_at`, `library_items.type`, `library_items.topic_id`
- Кэш GET-эндпоинтов контента (optional, фаза 2)

---

## 7. Интеграция frontend → backend

### 7.1. Consultation (первая интеграция)

**Frontend change (будущее, вне scope backend ТЗ):**

```typescript
// ConsultationForm.tsx
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/consultation`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

**Env frontend:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 7.2. Newsletter

Footer form → `POST /api/newsletter/subscribe`

### 7.3. Journal / Library

Заменить импорт из `@/data/*` на fetch к API (SSR или client-side).

---

## 8. SQL-скрипты (roadmap)

| Файл | Таблица | Фаза |
|------|---------|------|
| `consultation_requests.sql` | consultation_requests | 1 ✅ |
| `consultation_requests_permissions.sql` | GRANT/RLS | 1 ✅ |
| `newsletter_subscribers.sql` | newsletter_subscribers | 1 |
| `library.sql` | library_topics, library_items | 2 |
| `journal.sql` | journal_issues | 2 |
| `education_enrollments.sql` | education_enrollments | 3 |
| `tools_snapshots.sql` | ieu_assessments, etc. | 4 |
| `auth_organizations.sql` | users, organizations | 5 |

---

## 9. Explicit Out of Scope (не делать без отдельного ТЗ)

- Advertisements / рекламные модули
- Payment / billing
- Email sending (можно добавить позже через Supabase Edge Functions или Resend)
- Mobile app API
- GraphQL
- Microservices split
- CMS admin UI (только API на первых фазах)

---

## 10. Backlog / известные проблемы

| # | Проблема | Решение |
|---|----------|---------|
| 1 | `organization` есть во frontend, нет в backend | ALTER TABLE + schema update |
| 2 | phone/email required на frontend, optional в backend | синхронизировать Zod |
| 3 | `permission denied for consultation_requests` | выполнить GRANT SQL |
| 4 | `SUPABASE_URL` с `/rest/v1` | нормализация в supabase.ts ✅ |
| 5 | Library показывает 109 материалов, в data ~17 | фаза 2 CMS |
| 6 | PDF журналов не лежат в `public/journals/` | Supabase Storage, фаза 2 |
| 7 | Error middleware два формата ответа | унификация на фазе 1.5 |

---

## 11. Критерии приёмки по фазам

### Фаза 1 (MVP)

- [ ] POST `/api/consultation` сохраняет заявку с organization
- [ ] POST `/api/newsletter/subscribe` сохраняет email
- [ ] GRANT/RLS настроены для всех таблиц фазы 1
- [ ] `npm run build` без ошибок
- [ ] curl-тесты documented в README
- [ ] Frontend consultation form подключена к API

### Фаза 2

- [ ] GET `/api/library/items` с фильтрами
- [ ] GET `/api/journal/issues` + signed PDF URL
- [ ] Файлы в Supabase Storage

### Фаза 3–5

- [ ] Enrollments, tool snapshots, auth, dashboard — по отдельным спринтам

---

## 12. Приоритетный план (рекомендация)

```
Неделя 1–2:  Фаза 1 — consultation (fix organization) + newsletter
Неделя 3–4:  Фаза 2 — journal API + storage
Неделя 5–6:  Фаза 2 — library API
Неделя 7+:   Фаза 3 — education enrollments
Далее:       Фаза 4–5 — tools history, auth, dashboard
```

---

## 13. Ссылки на код проекта

| Область | Путь |
|---------|------|
| Frontend forms | `frontend/components/sections/consultation/ConsultationForm.tsx` |
| Frontend data | `frontend/data/` |
| Backend entry | `backend/src/index.ts` |
| Consultation module | `backend/src/modules/consultation/` |
| Supabase config | `backend/src/config/supabase.ts` |
| SQL | `backend/docs/` |

---

*Документ подготовлен на основе анализа codebase AKYL (frontend + backend) без внесения изменений в код.*
