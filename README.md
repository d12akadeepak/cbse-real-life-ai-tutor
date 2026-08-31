# CBSE Real-Life AI Tutor

Dynamic cloud-ready AI tutor MVP for CBSE Class 9 and 10 students.

## What is included

- Dynamic interactive landing/app page
- Class 9 and Class 10 selector
- AI Tutor selector: Maths, Physics, Chemistry, Biology
- Topic-wise real-life examples
- Difficult word meanings
- Smart notes concept
- Quiz and weak-topic tracking concept
- AI video storyboard generation API
- Syllabus, PYQ, simulation and virtual lab resource layer
- Premium private tutor concept
- Cloud-ready architecture for Vercel + Supabase + AI APIs

## Cloud stack

Recommended setup:

```txt
GitHub → source code
Vercel → Next.js hosting
Supabase → PostgreSQL, pgvector, storage
Clerk or Supabase Auth → login
OpenAI / Claude / Gemini → AI tutor
Veo / Runway / Luma → AI videos later
Razorpay → Premium payments
```

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell:

```powershell
copy .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Deploy to Vercel

1. Go to Vercel.
2. Import this GitHub repo.
3. Keep framework as Next.js.
4. Add environment variables from `.env.example`.
5. Deploy.

For first demo, you can deploy without API keys because the current page works in demo mode.

## Production next steps

1. Add Clerk or Supabase Auth.
2. Create Supabase Postgres database.
3. Add `DATABASE_URL` in Vercel.
4. Run Prisma migrations.
5. Add OpenAI / Claude / Gemini keys.
6. Add pgvector and ingest NCERT/CBSE content.
7. Add Supabase Storage for topic videos.
8. Add Razorpay for Premium and Private Tutor booking.

## Important licensing note

External simulations and virtual labs such as oPhysics and ChemCollective should be linked as external resources unless you have explicit permission to embed/copy content in a commercial app.
