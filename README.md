# Ecommerce Full Stack

A full-stack e-commerce platform. The backend is a production-style REST API built with **NestJS**, **Prisma**, and **PostgreSQL (Neon)**, covering authentication, product/category catalog, orders, and Stripe payments. The frontend is in active development.

> **Status:** Backend (`api/`) is functional and under active iteration. Frontend is being designed/built next.

---

## Tech Stack

**Backend (`api/`)**
- [NestJS 11](https://nestjs.com/) — TypeScript framework
- [Prisma 7](https://www.prisma.io/) with `@prisma/adapter-pg` — ORM, targeting PostgreSQL (Neon serverless Postgres)
- **JWT auth** (`@nestjs/jwt`, `passport-jwt`) with access + refresh tokens and role-based access control (`Role: USER | ADMIN`)
- **Stripe** — payment intents and payment confirmation
- **Swagger / OpenAPI** — live API docs at `/api/docs`
- **class-validator / class-transformer** — DTO validation
- **@nestjs/throttler** — request rate limiting
- **Jest** — unit and e2e tests

**Frontend**
- Not yet in this repo — planned as a separate `front/` (or similar) directory.

---

## Project Structure

```
Ecommerce-Full-Stack/
└── api/                        # NestJS backend
    ├── prisma/
    │   ├── schema.prisma       # Data models
    │   └── migrations/
    ├── src/
    │   ├── common/
    │   │   ├── decorators/     # @Roles, @GetUser, custom throttler
    │   │   └── guards/         # JwtAuthGuard, RolesGuard
    │   ├── prisma/             # PrismaService / PrismaModule
    │   ├── modules/
    │   │   ├── auth/           # register, login, refresh, logout
    │   │   ├── users/          # profile, admin user management
    │   │   ├── category/       # product categories
    │   │   ├── products/       # product catalog + stock
    │   │   ├── orders/         # order lifecycle
    │   │   └── payments/       # Stripe payment intents
    │   ├── app.module.ts
    │   └── main.ts
    └── package.json
```

---

## Data Model

Defined in `api/prisma/schema.prisma`:

| Model        | Purpose                                                        |
|--------------|------------------------------------------------------------------|
| `User`       | Account, role (`USER`/`ADMIN`), refresh token, relations to orders, carts, payments |
| `Category`   | Product categories (slug-based)                                |
| `Product`    | Catalog items — price, stock, SKU, category                    |
| `Cart` / `CartItem` | Shopping cart per user                                   |
| `Order` / `OrderItem` | Placed orders with status (`PENDING → DELIVERED/CANCELLED`) |
| `Payment`    | Stripe payment record linked 1:1 to an order (`PENDING → COMPLETED/FAILED/REFUNDED`) |

---

## API Overview

Base path: `/api/v1` · Interactive docs: `/api/docs` (Swagger UI, JWT bearer auth supported)

| Module     | Base route     | Endpoints (summary) |
|------------|---------------|----------------------|
| Auth       | `/auth`        | `POST /register`, `POST /login`, `POST /refresh`, `POST /logout` |
| Users      | `/users`       | `GET /me`, `PATCH /me`, `PATCH /me/password`, `DELETE /me`, plus admin `GET /`, `GET /:id`, `DELETE /:id` |
| Category   | `/category`    | `POST /`, `GET /`, `GET /:id`, `GET /slug/:slug`, `PATCH /:id`, `DELETE /:id` |
| Products   | `/products`    | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `PATCH /:id/stock`, `DELETE /:id` |
| Orders     | `/orders`      | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`, plus admin `GET /admin/all`, `GET /admin/:id`, `PATCH /admin/:id`, `DELETE /admin/:id` |
| Payments   | `/payments`    | `POST /create-intent`, `POST /confirm`, `GET /`, `GET /:id`, `GET /order/:orderId` |

Admin-only routes are protected via a `RolesGuard` + `@Roles(Role.ADMIN)` decorator on top of JWT auth.

---

## Getting Started

### Prerequisites
- Node.js 20+
- A PostgreSQL database (this project targets [Neon](https://neon.tech), but any Postgres instance works)
- A [Stripe](https://stripe.com) account (test mode is fine) for the Payments module

### 1. Install dependencies
```bash
cd api
npm install
```

### 2. Configure environment variables
Create `api/.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# JWT
JWT_SECRET="your-access-token-secret"
JWT_EXPIRES_IN=900
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."

# App
PORT=3001
ALLOWED_ORIGINS="http://localhost:3000"
NODE_ENV=development
```

### 3. Run database migrations
```bash
npx prisma migrate dev
```

### 4. Start the server
```bash
npm run dev        # watch mode
# or
npm run start       # single run
```

The API will be available at `http://localhost:3001/api/v1`, with Swagger docs at `http://localhost:3001/api/docs`.

### Other useful scripts
```bash
npm run build        # compile
npm run start:prod   # run compiled build
npm run lint         # eslint --fix
npm run format        # prettier
npm run test          # unit tests
npm run test:e2e      # e2e tests
npm run test:cov      # coverage report
```

---

## Security Notes
- Access tokens and refresh tokens use separate secrets (`JWT_SECRET` / `JWT_REFRESH_SECRET`).
- Refresh tokens are hashed with `bcrypt` before being stored on the `User` record and compared on refresh.
- Global `ValidationPipe` runs with `whitelist` and `forbidNonWhitelisted` to reject unexpected payload fields.
- Rate limiting is enabled globally via `ThrottlerModule` (10 requests / 60s by default, overridable per-route).

---

## Roadmap
- [ ] Frontend application (React / Next.js, dark futuristic UI with 3D elements)
- [ ] Cart module wiring into checkout flow
- [ ] Webhook handling for Stripe payment status updates
- [ ] Deployment configuration

---

## License
UNLICENSED — private/personal project.