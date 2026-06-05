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
SUPABASE_SECRET_KEY=your-secret-key
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

## Database setup

Before using consultation API, run SQL from:

```bash
backend/docs/consultation_requests.sql
```

Apply it manually in Supabase SQL Editor.

## Consultation API

Create a consultation request:

```bash
curl -X POST http://localhost:4000/api/consultation \
-H "Content-Type: application/json" \
-d '{
  "name":"Test User",
  "email":"test@test.com",
  "organization":"ОСИ дома №12",
  "message":"Test message"
}'
```

Success response (HTTP 201):

```json
{
  "success": true,
  "message": "Consultation request created"
}
```

Validation error (HTTP 400):

```json
{
  "success": false,
  "message": "Validation error"
}
```

Database error (HTTP 500):

```json
{
  "success": false,
  "message": "Database error"
}
```
