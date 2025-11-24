# Repository Guidelines

## Project Structure & Module Organization
`src/index.js` boots the Express HTTP server hosted in `Infrastructures/WebServer`, and each feature follows a DDD-style layout: `Domains/` keeps business entities and Prisma mappers, `Applications/<Feature>/` holds use cases, `Interfaces/` wraps presenters/controllers, `Infrastructures/` contains adapters such as repositories, and `Commons/` stores shared helpers. Keep API descriptions in `docs/` (components, configs, paths, tags) in sync with the modules that serve them. Database assets reside in `prisma/schema.prisma`, split into `prisma/entities/*.prisma`, with executable helpers like `prisma/seed.js`; copy `.env.example` to `.env` to provide connection strings before touching these layers.

## Build, Test, and Development Commands
- `npm install` – install dependencies before generating Prisma artifacts.
- `npm run dev` – launch Nodemon for hot-reloaded Express development.
- `npm start` – start the production HTTP server (used for deployed builds).
- `npm run build:schema` – regenerate the composed Prisma schema from `prisma/entities`.
- `npm run prisma:generate` – rebuild the Prisma client after schema edits.
- `npm run prisma:migrate` – push local migrations into the Postgres database.
- `npm run prisma:seed` – execute `prisma/seed.js` to populate baseline RBAC accounts.
- `npx eslint . && npx prettier --check .` – lint/format check prior to opening a PR.
- `npm test` – reserve this script for your chosen runner (e.g., Jest/Vitest) and ensure it passes before requesting review.

## Coding Style & Naming Conventions
ESLint enforces tabs with 4-wide indentation, double quotes, trailing semicolons, spaced braces, and `prefer-const`; Prettier mirrors those assumptions with a 120-character print width. Keep feature folders and presenters in PascalCase (e.g., `MenuPresenter.js`), but use `camelCase` for functions/variables and `UPPER_SNAKE_CASE` for constants or environment keys. Respect layer boundaries: controllers should defer to application services, which in turn compose domain entities rather than reading infrastructure modules directly.

## Testing Guidelines
Add feature-scoped specs beside the implementation (for example, `src/Applications/Transactions/__tests__/create-transaction.spec.js`) and favor integration tests that hit the Express server via Supertest so HTTP payloads stay contract-safe with `docs`. Cover complex application services and Prisma repository mappings with unit tests, keeping at least smoke coverage for each newly introduced use case. Name test files with `.spec.js` or `.test.js` suffixes, mock external systems with dependency injection, and wire your runner to `npm test` so CI can fail fast.

## Commit & Pull Request Guidelines
Recent history favors short, imperative subjects such as `add permission, entities, etc`; follow that pattern, stay below ~72 characters, and include scope hints when touching several modules (e.g., `transactions: add refund endpoint`). Each PR should describe the change, link any issue/ticket, list schema or seed migrations, and attach screenshots or curl samples when HTTP responses change. Ensure checklists cover `npm run prisma:migrate`, linters, and the future `npm test` run so reviewers can focus on logic rather than setup.

## Security & Configuration Tips
Never commit `.env`; duplicate `.env.example`, set `DATABASE_URL`, and only configure optional `SEED_*` variables locally. After editing anything inside `prisma/entities`, rerun the build/generate/migrate sequence and verify that secrets are injected through environment variables instead of constants. Limit personal data in seed files, rotate any leaked credentials immediately, and use feature-specific env names (e.g., `DELIVERY_API_KEY`) to keep configuration explicit.
