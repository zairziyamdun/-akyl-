# AKYL Backend — инструкция

[Общий README](../README.md) · [Frontend](../frontend/README.md)

Express API на TypeScript. Supabase используется для Auth, PostgreSQL и Storage; Zod проверяет входные данные, Vitest запускает тесты. Локальный адрес API — `http://localhost:4000`.

## Первый запуск в Windows PowerShell

Команды выполняются из корня репозитория:

```powershell
cd backend
pnpm install --frozen-lockfile
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Нужны Node.js 22, pnpm и доступ к проекту Supabase. Если `.env` уже существует, сохраните его настройки. Минимальное содержимое:

```env
PORT=4000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=replace-with-server-key
FRONTEND_URL=http://localhost:3000
```

Замените примеры реальными значениями. Вместо `SUPABASE_SERVICE_ROLE_KEY` можно указать `SUPABASE_SECRET_KEY`. Неиспользуемые строки с пустыми ключами и Telegram удалите: текущая схема проверяет минимальную длину присутствующих значений.

```powershell
pnpm dev
```

Успешный запуск выводит `AKYL Backend running on port 4000`. Оставьте терминал открытым. `tsx watch` перезапускает сервер при изменениях кода; после редактирования `.env` остановите процесс через `Ctrl+C` и запустите заново. Запускайте команды именно из `backend`: `dotenv.config()` читает `.env` текущей рабочей папки.

## Переменные окружения

| Переменная | Назначение |
| --- | --- |
| `SUPABASE_URL` | Обязательно: URL проекта, без `/rest/v1` |
| `SUPABASE_SERVICE_ROLE_KEY` | Серверный ключ; нужен он либо `SUPABASE_SECRET_KEY` |
| `SUPABASE_SECRET_KEY` | Альтернатива service role key; при наличии обоих приоритет у service role |
| `PORT` | Локальный порт, по умолчанию `4000` |
| `NODE_ENV` | `development`, `production` или `test` |
| `FRONTEND_URL` | Разрешённые CORS origin через запятую, по умолчанию `http://localhost:3000` |
| `TELEGRAM_BOT_TOKEN` | Необязательный токен бота уведомлений |
| `TELEGRAM_CHAT_ID` | Необязательный чат уведомлений; настраивается вместе с токеном |

Origin — протокол, хост и порт, без пути и завершающего слеша. Например: `http://localhost:3000,https://example.com`. `localhost` и `127.0.0.1` — разные origin.

Серверный ключ не помещают во frontend или переменные с префиксом `NEXT_PUBLIC_`. Локальный `.env` исключён из Git.

### Если настройки уже сохранены в Vercel

Откройте проект backend → Settings → Environment Variables. Скопируйте доступные значения `SUPABASE_URL` и одного серверного ключа в локальный `.env`. Production и Preview могут иметь разные значения. Переменные типа Sensitive повторно не раскрываются; такой ключ потребуется получить у владельца проекта Supabase или настроить новый.

Источники: [переменные Vercel](https://vercel.com/docs/environment-variables), [Sensitive-переменные](https://vercel.com/academy/optimize-your-vercel-account/sensitive-env-vars).

## База данных и Storage

Для полного запуска нужны, в частности, таблицы `profiles`, `journal_issues`, `consultation_requests`, `journal_subscription_settings`, `journal_subscriptions`. Полного комплекта миграций для новой пустой базы в репозитории нет. Используйте подготовленный проект либо согласуйте недостающую схему с его владельцем; одного `.env` недостаточно.

Доступные SQL-файлы выполняются вручную в Supabase SQL Editor после проверки существующей схемы:

1. [consultation_requests.sql](docs/consultation_requests.sql) — заявки.
2. [journal_subscription_settings.sql](docs/journal_subscription_settings.sql) — предложение подписки.
3. [journal_subscriptions.sql](docs/journal_subscriptions.sql) — подписки пользователей, включая ограничение одной открытой подписки.

[drop_jk_tables.sql](docs/drop_jk_tables.sql) удаляет старые таблицы. Это не обязательный шаг установки, не запускайте его как миграцию нового проекта.

Storage должен содержать:

| Bucket | Доступ | Файлы |
| --- | --- | --- |
| `journal-covers` | Public: обложка отображается по публичному URL | JPEG, PNG, WebP; ограничение приложения 10 MB |
| `journal-pdfs` | Private: доступ через проверку прав и подписанные URL | PDF до 50 MB |

Лимиты и разрешённые MIME-типы bucket должны допускать указанные файлы. PDF загружается из браузера напрямую в Storage по URL, который выдаёт `/api/journal/upload-pdf/init`. Обложка проходит через API; лимиты хостинга могут быть меньше лимита приложения.

Роли профиля: `user`, `journalist`, `admin`. Обычная регистрация создаёт `user`; первого администратора назначает владелец базы в существующем профиле. Смена ролей через API доступна только администратору.

## Проверка запуска

В отдельном PowerShell:

```powershell
Invoke-RestMethod http://localhost:4000/health
Invoke-RestMethod http://localhost:4000/health/supabase
```

`/health` подтверждает работу процесса и возвращает `status: ok`. `/health/supabase` проверяет обращение к Supabase: результат `connected` не гарантирует наличие всех прикладных таблиц; `client_created` также не подтверждает полную готовность базы.

При отсутствующем обязательном env сервер падает до открытия порта, поэтому health endpoint недоступен. Ошибка credentials или сети на запущенном сервере диагностируется через `/health/supabase` и логи.

## Команды

В папке `backend`:

| Команда | Действие |
| --- | --- |
| `pnpm dev` | Запуск с наблюдением за кодом |
| `pnpm exec tsc --noEmit` | Проверка типов без сборки |
| `pnpm test` | Все Vitest-тесты |
| `pnpm test:watch` | Тесты в режиме наблюдения |
| `pnpm build` | Компиляция в `dist` |
| `pnpm start` | Запуск `dist/src/index.js` после сборки |

## Основные API-маршруты

Защищённые запросы используют `Authorization: Bearer <access_token>`. Правила доступа проверяются backend.

| Метод | Путь | Назначение |
| --- | --- | --- |
| POST | `/api/auth/register` | Создать аккаунт; телефон необязателен |
| POST | `/api/auth/login` | Получить сессию |
| GET | `/api/auth/me` | Текущий пользователь |
| PATCH | `/api/auth/profile` | Изменить профиль |
| POST | `/api/auth/logout` | Выход |
| GET / POST | `/api/journal/issues` | Список / создание выпуска |
| GET / PATCH / DELETE | `/api/journal/issues/:id` | Чтение / изменение / удаление |
| POST | `/api/journal/issues/:id/submit` | Отправить на проверку |
| POST | `/api/journal/issues/:id/publish` | Опубликовать, admin |
| POST | `/api/journal/issues/:id/archive` | Архивировать, admin |
| POST | `/api/journal/issues/:id/revision` | Вернуть на доработку, admin |
| POST | `/api/journal/upload-cover` | Загрузить обложку |
| POST | `/api/journal/upload-pdf/init` | Получить параметры прямой загрузки PDF |
| POST | `/api/journal/upload-pdf` | Серверная загрузка PDF, альтернативный маршрут |
| GET | `/api/journal/issues/:id/pdf` | Получить URL PDF после проверки доступа |
| GET / POST | `/api/consultation` | Список заявок для admin / публичная заявка |
| PATCH | `/api/consultation/:id/status` | Изменить статус заявки |
| GET | `/api/subscription` | Предложение подписки |
| GET / POST | `/api/subscription/me` | Моя подписка / начало оформления |
| GET / POST | `/api/admin/users` | Список / создание пользователей |
| PATCH | `/api/admin/users/:id/role` | Роль пользователя |
| PATCH | `/api/admin/users/:id/status` | Статус пользователя |
| DELETE | `/api/admin/users/:id` | Удаление пользователя |
| GET / PATCH | `/api/admin/subscription` | Настройки подписки |
| GET | `/api/admin/subscription/subscribers` | Подписчики |
| PATCH | `/api/admin/subscription/subscribers/:id` | Изменить подписку |

Успех имеет поле `success: true`, данные — в `data`, если они возвращаются. Ошибка содержит `success: false` и `message`; ошибки валидации могут содержать `errors`.

## Развёртывание backend на Vercel

Создайте отдельный проект из репозитория с Root Directory `backend`. В репозитории уже есть [vercel.json](vercel.json), направляющий запросы в [api/index.ts](api/index.ts); `pnpm dev` и `pnpm start` не являются командами запуска serverless-функции.

В настройках проекта задайте URL и серверный ключ Supabase, `FRONTEND_URL` с HTTPS-origin frontend и, при необходимости, Telegram. После изменения env выполните новый deployment. Проверьте `/health` по адресу развёрнутого backend, затем укажите этот адрес в `NEXT_PUBLIC_API_URL` frontend.

См. [Vercel: Root Directory для монорепозиториев](https://vercel.com/docs/monorepos).

## Частые проблемы

| Симптом | Что проверить |
| --- | --- |
| `SUPABASE_URL Required`, `ZodError` при старте | Есть ли именно `backend/.env`, а не `.env.txt`; заполнен ли URL; запуск из `backend` |
| Ошибка на пустом ключе или Telegram | Удалите неиспользуемые пустые строки, оставьте один заполненный серверный ключ |
| Frontend не может связаться с `localhost:4000` | Backend не завершился с ошибкой, порт совпадает, `/health` отвечает |
| Health отвечает, браузер блокирует запрос | `FRONTEND_URL` точно совпадает с origin frontend; перезапустите backend |
| Supabase authentication failed | Ключ серверный, действующий и принадлежит тому же проекту, что URL |
| Table not found / profile not found | Подготовлена ли схема, существует ли профиль пользователя |
| Bucket not found / ошибка загрузки | Имена bucket, доступ, размер и MIME-типы |
| `EADDRINUSE` | Порт занят; остановите другой сервер либо поменяйте `PORT` и адрес API frontend |
