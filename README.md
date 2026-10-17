# Horizon 28

Executable intelligence feed for enterprise leaders and investors navigating the 24-month window to transformative AI.

## What Is Built

- Next.js 16 app router dashboard with Tailwind CSS
- Strict dark-mode bento layout with sharp glass panels
- C-suite intelligence sections for compute supply, export controls, 2028 scenarios, and executable updates
- API route scaffolding for Perplexity ingestion, Anthropic synthesis, Gemini extraction, and Supabase persistence
- Vercel Cron config for a daily morning run

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run The iPhone App

```bash
npm run mobile:ios
```

This starts the Expo app in the iOS Simulator.

For Expo Go:

```bash
npm run mobile
```

Scan the QR code with Expo Go on your iPhone. The mobile app lives in `mobile/`.

## API

Check readiness:

```bash
curl http://localhost:3000/api/intelligence/run
```

Trigger a run:

```bash
curl -X POST http://localhost:3000/api/intelligence/run
```

If model keys are missing, the route returns a mock intelligence run so the product stays demoable without paid API calls.

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
PERPLEXITY_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CRON_SECRET=
```

Model names are configurable with `PERPLEXITY_MODEL`, `ANTHROPIC_MODEL`, and `GEMINI_MODEL`.

## Supabase Table

Create this table before enabling persistence:

```sql
create table horizon28_intelligence_runs (
  id uuid primary key default gen_random_uuid(),
  generated_at timestamptz not null,
  payload jsonb not null,
  source_text text,
  synthesis_text text,
  created_at timestamptz not null default now()
);
```

## Cron

`vercel.json` schedules `/api/cron/daily-intelligence` at `0 12 * * *` UTC. Set `CRON_SECRET` in Vercel and send `Authorization: Bearer <CRON_SECRET>` for protected manual calls.
