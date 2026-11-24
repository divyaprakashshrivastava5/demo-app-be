# demo-app-be

Node.js API for DeployPanel multi-service dogfood (from `examples/multiservice/api`).

## DeployPanel deploy

| Setting | Value |
|---------|-------|
| Language | `node` |
| Start | `node server.js` (after `npm install --omit=dev`) |
| Container listen | port **3000** (`PORT` env, default 3000) |
| Typical host publish | **3001** (wizard maps host → container 3000) |
| Env | `DATABASE_URL` — Postgres connection string when a DB add-on is attached (optional; API reports `db: skipped` without it) |
| Dockerfile | not required — DeployPanel generates one |

Pair with the FE repo [demo-app-fe](https://github.com/divyaprakashshrivastava5/demo-app-fe).

## Local run

```bash
npm install
# optional: set DATABASE_URL=postgres://user:pass@host:5432/db
npm start
```
