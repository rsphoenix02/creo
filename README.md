# CREO — AI Ad Creative Analyzer

CREO is an AI-powered ad creative analysis tool for performance marketers. Paste your ad copy, get a structured analysis across 5 performance dimensions, and know exactly what to fix before you spend a dollar.

**Never run a bad ad twice.**

## What It Does

CREO evaluates ad copy across five dimensions and returns scores with actionable feedback:

| Dimension | What It Measures |
|---|---|
| **Hook Strength** | Does the first line stop the scroll? |
| **Value Proposition Clarity** | Is it obvious what the product does and why the reader should care? |
| **Copy Flow** | Does the copy move the reader forward with rhythm and structure? |
| **CTA Effectiveness** | Does the call to action create urgency and reduce friction? |
| **Audience-Creative Fit** | Does the tone and language match the target audience? |

Each dimension returns a score, reasoning, and a specific suggestion for improvement. An overall score and a single "top improvement" callout tell the user the one thing that would move the needle most.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI (Python 3.12), async |
| AI | Claude API via Anthropic Python SDK |
| Database | Neon (serverless Postgres) via asyncpg |
| Deployment | Docker, GCP Cloud Run |

## Project Structure

```
creo/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js app router (layout, page, styles)
│   │   ├── components/     # React components (Hero, Analyzer, ScoreRing, etc.)
│   │   ├── lib/            # API client, constants, utilities
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   ├── Dockerfile
│   └── package.json
│
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── main.py         # App entry point, CORS, router registration
│   │   ├── api/v1/         # Versioned API routes (waitlist, demo)
│   │   ├── core/           # Configuration (pydantic-settings)
│   │   └── db/             # Database connection pool (asyncpg)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
└── README.md
```

## Prerequisites

- **Node.js** 18+
- **Python** 3.12+
- **Anthropic API key** — get one at [console.anthropic.com](https://console.anthropic.com)
- **Neon database** (or any PostgreSQL instance) — create a free project at [neon.tech](https://neon.tech)

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/rsphoenix02/creo.git
cd creo
```

### 2. Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your actual values (see Environment Variables below)

# Run the development server
uvicorn app.main:app --reload --port 8080
```

The backend will be available at `http://localhost:8080`. Verify with:

```bash
curl http://localhost:8080/health
# → {"status":"ok"}
```

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
# Create a .env.local file with your backend URL:
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes | Neon Postgres connection string | `postgresql://user:pass@ep-xxx.region.neon.tech/creo?sslmode=require` |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for Claude | `sk-ant-...` |
| `ALLOWED_ORIGINS` | No | JSON array of allowed CORS origins (default: `["http://localhost:3000"]`) | `["http://localhost:3000","https://yourcreo.com"]` |
| `DEMO_RATE_LIMIT_REQUESTS` | No | Max demo analyses per IP per window (default: 3) | `3` |
| `DEMO_RATE_LIMIT_WINDOW_SECONDS` | No | Rate limit window in seconds (default: 86400) | `86400` |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL | `http://localhost:8080` |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check (used by Cloud Run) |
| `POST` | `/api/v1/waitlist` | Capture waitlist signups |
| `GET` | `/api/v1/waitlist/count` | Get waitlist count for social proof |
| `POST` | `/api/v1/demo` | Analyze ad copy (rate limited, 3/day per IP) |
| `POST` | `/analyze` | Legacy compatibility endpoint for ad analysis |

## Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build with type checking |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---|---|
| `uvicorn app.main:app --reload` | Start development server with auto-reload |
| `pip install -r requirements.txt` | Install Python dependencies |

## Docker

Both services include Dockerfiles for containerized deployment.

```bash
# Build and run backend
cd backend
docker build -t creo-backend .
docker run -p 8080:8080 --env-file .env creo-backend

# Build and run frontend
cd frontend
docker build -t creo-frontend .
docker run -p 3000:8080 creo-frontend
```

## License

[MIT](LICENSE)
