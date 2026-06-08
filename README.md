# NexaERP Maroc

ERP SaaS Cloud 100% marocain (socle initial) avec architecture monorepo:

- Frontend: Next.js + TypeScript + TailwindCSS
- Backend: NestJS + TypeScript
- Base de données: PostgreSQL
- Cache: Redis
- Déploiement: Docker / Railway

## Structure

- `apps/web` : application frontend Next.js
- `apps/api` : API backend NestJS
- `packages/shared` : types partagés
- `infra` : docker-compose, Dockerfiles, variables d'environnement
- `docs` : documentation technique et déploiement

## Démarrage rapide

```bash
npm install
npm run dev:api
npm run dev:web
```

## Variables d'environnement

Copier les exemples:
- `apps/api/.env.example` -> `apps/api/.env`
- `apps/web/.env.example` -> `apps/web/.env`

## Déploiement Railway

Voir `docs/deployment-railway.md`.
