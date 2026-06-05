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
NODE_ENV=development
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

## API response format

All endpoints return a unified JSON shape.

Success:

```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [{ "path": "field", "message": "Details" }]
}
```

## Health checks

Basic health:

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "akyl-backend"
  }
}
```

Supabase health:

```bash
curl http://localhost:4000/health/supabase
```

Expected response when Supabase credentials are valid:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "supabase": "connected"
  }
}
```

If Supabase env variables are missing or invalid, the endpoint returns HTTP 503 with a unified error response.

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
  "message": "Validation error",
  "errors": [
    { "path": "name", "message": "Name is required" }
  ]
}
```

Database error (HTTP 500):

```json
{
  "success": false,
  "message": "Database error"
}
```
