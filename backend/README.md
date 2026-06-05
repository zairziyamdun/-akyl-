# AKYL Backend

Node.js + Express API for the AKYL platform.

## Stack

- Node.js
- TypeScript
- Express
- Supabase
- Zod
- CORS

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Fill in `.env`:

```env
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

## Development

Start the dev server with hot reload:

```bash
npm run dev
```

The API runs at `http://localhost:4000` by default.

## Production build

```bash
npm run build
npm start
```

## Health checks

Basic health:

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "akyl-backend"
}
```

Supabase health:

```bash
curl http://localhost:4000/health/supabase
```

Expected response when Supabase credentials are valid:

```json
{
  "status": "ok",
  "supabase": "connected"
}
```

If Supabase env variables are missing or invalid, the endpoint returns HTTP 500 with a clear error message.
