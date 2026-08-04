# Weather App (MVP) — Local Run Instructions

This repo contains a minimal Weather Application skeleton: an Express-based API proxy (keeps API key server-side) and a small static frontend in `public/`.

Prerequisites

- Node.js 18+ and npm

Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set `WEATHER_API_KEY` (and optionally `WEATHER_API_URL`, `PORT`, `UNITS`). Example provider: OpenWeatherMap.

3. Run the app:

```bash
npm start
# or for development with auto-reload (if you have nodemon):
npm run dev
```

4. Open http://localhost:3000

Notes

- This is a lightweight starter skeleton. The backend proxies requests to the provider configured via `WEATHER_API_URL` and `WEATHER_API_KEY`.
- Do NOT commit real API keys. Use secret management or server-side key storage for production.

Next steps

- Choose a production weather data provider and update `docs/PRD.md` and `docs/Architecture-Design.md` with the decision (Q-001).
- Decide whether to deploy the server component (Q-002) and which platforms to prioritize (Q-003).
# AI-Agents