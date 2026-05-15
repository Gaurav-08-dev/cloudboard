# Enterprise MERN Showcase Project

**CloudBoard** — Enterprise-grade analytics and collaboration platform.

This project is intentionally designed to demonstrate:

- MERN stack architecture
- Authentication & authorization
- JWT + OAuth + SSO concepts
- AWS Lambda + S3 + CloudFront
- Secure refresh-token implementation
- CI/CD pipelines
- Scalable frontend architecture
- Production-grade backend practices
- Observability and monitoring
- Git workflows
- System design concepts

---

# 1. Project Overview

CloudBoard is a multi-tenant dashboard platform where users can:

- create dashboards
- upload files/images
- collaborate in realtime
- manage teams
- authenticate via Google OAuth
- securely upload assets to S3
- access analytics widgets
- manage sessions across devices
- view audit logs

The architecture intentionally includes:

- React frontend
- Node.js backend
- MongoDB database
- Redis caching/session support
- AWS Lambda for async processing
- S3 for storage
- CloudFront CDN
- CI/CD using GitHub Actions

---

# 2. High-Level Architecture

```txt
Users
   ↓
CloudFront CDN
   ↓
React Frontend (Vite/Next.js)
   ↓
API Gateway / Nginx
   ↓
Node.js Backend
   ↓
MongoDB + Redis
   ↓
AWS S3
   ↓
Lambda Processing
```

---

# 3. Features Mapping To Interview Topics

| Feature                | Topics Covered           |
| ---------------------- | ------------------------ |
| Google Login           | OAuth, SSO               |
| JWT auth               | Access/refresh tokens    |
| Session management     | Multi-device login       |
| File uploads           | S3 signed URLs           |
| Image processing       | Lambda                   |
| CDN delivery           | CloudFront               |
| Activity logs          | MongoDB indexing         |
| Dashboard widgets      | React architecture       |
| Infinite scrolling     | Performance optimization |
| CI/CD                  | GitHub Actions           |
| Role-based access      | JWT authorization        |
| Realtime notifications | WebSockets               |
| Audit logs             | Observability            |
| Background jobs        | Queues/retries           |

---

# 4. Frontend Stack

## Core

- React
- TypeScript
- Vite or Next.js
- React Query/TanStack Query
- Zustand/Redux Toolkit
- React Router
- Axios

---

## Frontend Concepts Demonstrated

### React Architecture

- feature-based folder structure
- reusable hooks
- compound components
- lazy loading
- route-level code splitting

### Performance

- virtualization
- memoization
- debouncing
- throttling
- infinite scroll

### Security

- protected routes
- token refresh flow
- HttpOnly cookie integration

### Accessibility

- keyboard navigation
- semantic HTML
- aria labels

---

# 5. Backend Stack

## Core

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT
- Passport.js

---

## Backend Concepts Demonstrated

### Security

- JWT auth
- refresh token rotation
- OAuth integration
- rate limiting
- helmet
- CORS
- CSRF protection

### Scalability

- Redis caching
- queue-based processing
- pagination
- indexing
- aggregation pipelines

### Reliability

- retry mechanism
- DLQ concepts
- centralized logging
- graceful shutdown

---

# 6. Authentication System

## Login Flow

```txt
User Login
    ↓
Backend validates credentials
    ↓
Access token generated
    ↓
Refresh token stored in HttpOnly cookie
```

---

## Access Token

- short-lived
- stored in memory
- sent via Authorization header

---

## Refresh Token

- long-lived
- HttpOnly secure cookie
- stored in DB per-device
- rotated during refresh

---

## Features

### Multi-device login

Each device stores separate refresh token.

### Logout single device

Delete current refresh token.

### Logout all devices

Delete all refresh tokens for user.

### Replay attack protection

- refresh token rotation
- token invalidation
- session revocation

---

# 7. OAuth + SSO

## Google Login

Implemented using:

- Passport Google OAuth
- OAuth Authorization Code Flow

---

## Flow

```txt
Frontend
   ↓
Google Login
   ↓
Backend callback
   ↓
Internal JWT issued
```

---

## SSO Concepts

Simulate enterprise SSO using:

- centralized identity provider
- shared JWT validation
- organization-based access

---

# 8. AWS Integration

## S3 Upload Flow

```txt
Frontend requests signed URL
      ↓
Backend generates signed URL
      ↓
Frontend uploads directly to S3
```

---

## Lambda Usage

### Image Processing

```txt
S3 Upload
   ↓
Lambda Trigger
   ↓
Thumbnail generation
```

### Report Generation

Background report exports.

### Email Queue

Async email handling.

---

# 9. CloudFront CDN

Use CloudFront for:

- frontend asset delivery
- image CDN
- caching optimization

---

## Demonstrate

- cache invalidation
- asset versioning
- CDN optimization

---

# 10. MongoDB Design

## Collections

### Users

```js
{
  _id,
  email,
  role,
  organizationId
}
```

---

### Sessions

```js
{
  userId,
  refreshToken,
  device,
  ip,
  expiresAt
}
```

---

### Dashboards

```js
{
  title,
  widgets,
  createdBy
}
```

---

### ActivityLogs

```js
{
  userId,
  action,
  createdAt
}
```

---

## Important DB Concepts

### Indexes

```js
activityLogs.createIndex({
  userId: 1,
  createdAt: -1
})
```

### TTL Indexes

Auto-delete expired sessions.

### Aggregation Pipelines

Analytics queries.

---

# 11. Redis Usage

## Use Cases

- caching dashboard data
- rate limiting
- session blacklist
- queue management

---

## Example

```txt
Redis cache → dashboard widgets
```

---

# 12. Queue System

## Use BullMQ / SQS

Background tasks:

- email sending
- image processing
- analytics generation

---

## Retry Strategy

```txt
Job failure
   ↓
Retry 3 times
   ↓
DLQ if still failing
```

---

# 13. Monorepo Setup

Even though the frontend uses micro frontends, the entire platform is managed using a monorepo.

This demonstrates:

- enterprise-scale repository management
- shared tooling
- centralized CI/CD
- code sharing
- scalable developer experience

---

# Recommended Monorepo Tools

Preferred options:

| Tool | Why |
|---|---|
| Turborepo | Fast builds + caching |
| Nx | Enterprise orchestration |
| pnpm workspaces | Efficient dependency management |

---

# Recommended Stack

```txt
Turborepo
+ pnpm workspaces
+ Micro Frontends
```

---

# Repository Structure

```txt
cloudboard/
 ├── apps/
 │    ├── shell/
 │    ├── auth-mfe/
 │    ├── dashboard-mfe/
 │    ├── analytics-mfe/
 │    ├── admin-mfe/
 │    └── backend/
 │
 ├── packages/
 │    ├── ui/
 │    ├── auth-sdk/
 │    ├── eslint-config/
 │    ├── typescript-config/
 │    ├── shared-types/
 │    └── utils/
 │
 ├── infra/
 │    ├── terraform/
 │    ├── docker/
 │    └── github-actions/
 │
 ├── package.json
 ├── turbo.json
 └── pnpm-workspace.yaml
```

---

# Why Monorepo + Micro Frontends?

Very common enterprise setup.

Benefits:

| Benefit | Why |
|---|---|
| Shared UI library | Design consistency |
| Shared types | End-to-end type safety |
| Shared linting | Consistent standards |
| Shared auth SDK | Centralized auth logic |
| Faster onboarding | Single repository |

---

# Workspace Setup

## pnpm-workspace.yaml

```yaml
packages:
  - apps/*
  - packages/*
```

---

# Root package.json

```json
{
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test"
  }
}
```

---

# Turbo Configuration

## turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",

  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },

    "dev": {
      "cache": false
    }
  }
}
```

---

# Shared UI Package

```txt
packages/ui
```

Contains:

- buttons
- modals
- tables
- form components
- theme system

---

# Shared Auth SDK

```txt
packages/auth-sdk
```

Contains:

- token refresh logic
- axios interceptors
- auth hooks
- role utilities

---

# Shared Types Package

```txt
packages/shared-types
```

Example:

```ts
export interface User {
  id: string
  email: string
  role: string
}
```

---

# Local Development

## Start Entire Platform

```bash
pnpm dev
```

---

# Run Specific App

```bash
pnpm --filter dashboard-mfe dev
```

---

# Benefits of Turborepo

| Feature | Benefit |
|---|---|
| Incremental builds | Faster CI |
| Remote caching | Faster pipelines |
| Task orchestration | Dependency-aware builds |

---

# CI/CD in Monorepo

Important interview topic.

---

# Selective Deployment

Only changed apps deploy.

Example:

```txt
Changes in analytics-mfe
    ↓
Only analytics pipeline runs
```

---

# GitHub Actions Example

```yaml
- name: Build Changed Apps
  run: turbo run build --filter=...[origin/main]
```

---

# Backend in Monorepo

```txt
apps/backend
```

Benefits:

- shared types
- shared validation
- easier integration

---

# Shared ESLint Config

```txt
packages/eslint-config
```

Ensures:

- consistent linting
- shared standards

---

# Shared TypeScript Config

```txt
packages/typescript-config
```

Centralized tsconfig setup.

---

# Monorepo Interview Talking Points

This setup enables discussion around:

- scaling frontend teams
- dependency management
- CI optimization
- micro frontend orchestration
- build caching
- shared packages
- runtime federation
- deployment isolation

---

# Common Interview Questions

## Why monorepo?

Expected:

- shared tooling
- shared packages
- easier refactoring
- unified CI/CD

---

## Monorepo vs Polyrepo?

| Monorepo | Polyrepo |
|---|---|
| Easier sharing | Stronger isolation |
| Centralized tooling | Independent repos |
| Simpler refactors | Simpler permissions |

---

## Why combine monorepo + micro frontends?

Expected:

- runtime independence
- development consistency
- shared libraries
- scalable architecture

---

# 13A. Micro Frontend Architecture

Instead of a monorepo frontend, the system uses a micro frontend architecture.

This demonstrates:

- scalable frontend systems
- independent deployments
- team ownership boundaries
- runtime composition
- enterprise frontend architecture

---

# Why Micro Frontends?

Useful for:

- large engineering teams
- independently deployable apps
- domain-based ownership
- scaling frontend architecture

---

# Architecture

```txt
Shell App
   ├── Auth App
   ├── Dashboard App
   ├── Analytics App
   ├── Notifications App
   └── Admin App
```

---

# Recommended Technology

## Module Federation

Using:

- Webpack Module Federation OR
- Vite Federation Plugin

---

# Shell Application Responsibilities

The shell app handles:

- routing
- layout
- shared auth state
- navigation
- global theme
- runtime loading

---

# Individual Micro Frontends

## Auth App

Features:

- login
- OAuth
- refresh token handling
- session management

---

## Dashboard App

Features:

- widgets
- charts
- realtime data
- infinite scroll

---

## Analytics App

Features:

- aggregation visualization
- filters
- exports

---

## Admin App

Features:

- RBAC management
- user sessions
- audit logs

---

# Shared Package Strategy

Shared dependencies:

```txt
react
react-dom
zustand/redux
axios
ui library
```

---

# Example Module Federation Config

```js
new ModuleFederationPlugin({
  name: "dashboard",
  filename: "remoteEntry.js",

  exposes: {
    "./Dashboard": "./src/Dashboard"
  },

  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
```

---

# Runtime Loading Flow

```txt
Shell App
   ↓
Loads Remote Apps
   ↓
RemoteEntry.js
   ↓
Mounts Micro Frontend
```

---

# Authentication Across Micro Frontends

Important interview topic.

---

# Recommended Strategy

## Access Token

Stored in:

- memory
- shared auth provider

---

## Refresh Token

Stored in:

- HttpOnly cookie

---

# Shared Auth Flow

```txt
Shell App Auth Provider
        ↓
All MFEs consume auth state
```

---

# Communication Between Micro Frontends

Possible approaches:

| Method        | Use                       |
| ------------- | ------------------------- |
| Custom events | Lightweight communication |
| Shared state  | Auth/session              |
| URL state     | Routing-driven state      |
| Event bus     | Cross-app notifications   |

---

# Independent Deployment

Huge advantage of MFEs.

Example:

```txt
Deploy Analytics App
WITHOUT redeploying entire frontend
```

---

# CI/CD for Micro Frontends

Each frontend has independent pipeline.

---

# Example

```txt
Dashboard Repo
   ↓
GitHub Actions
   ↓
Build + Deploy
   ↓
CDN Update
```

---

# Frontend Deployment Architecture

```txt
CloudFront CDN
    ↓
Shell App
    ↓
Loads Remote Micro Frontends
```

---

# Versioning Challenges

Micro frontend interview topic.

Problems:

- dependency mismatches
- React duplication
- runtime incompatibility

---

# Solutions

- shared singleton dependencies
- semantic versioning
- contract-based APIs
- integration testing

---

# Observability in Micro Frontends

Track:

- app load failures
- runtime federation errors
- frontend performance metrics
- cross-app navigation latency

---

# Frontend Folder Structure (Per Micro Frontend)

```txt
src/
 ├── app/
 ├── pages/
 ├── components/
 ├── hooks/
 ├── services/
 ├── store/
 ├── routes/
 └── utils/
```

---

# 14. Backend Folder Structure

```txt
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── middlewares/
 ├── routes/
 ├── jobs/
 ├── config/
 ├── utils/
 ├── models/
 └── validations/
```

---

# 15. CI/CD Pipeline

## Frontend Pipeline

```txt
GitHub Push
   ↓
Install Dependencies
   ↓
Lint
   ↓
Run Tests
   ↓
Build Frontend
   ↓
Deploy to S3
   ↓
CloudFront Invalidation
```

---

## Backend Pipeline

```txt
GitHub Push
   ↓
Install Dependencies
   ↓
Lint
   ↓
Run Tests
   ↓
Docker Build
   ↓
Deploy to AWS
```

---

# 16. GitHub Actions Example

## Frontend Workflow

```yaml
name: Frontend CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

---

## Backend Workflow

```yaml
name: Backend CI

on:
  push:
    branches:
      - main

jobs:
  backend:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - run: npm install
      - run: npm run lint
      - run: npm run test
```

---

# 17. Docker Setup

## Frontend Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

---

## Backend Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
```

---

# 18. Observability

## Logging

Use:

- Winston/Pino
- structured logs
- request IDs

---

## Monitoring

- CloudWatch
- Grafana
- Prometheus

---

## Metrics

Track:

- API latency
- error rate
- queue failures
- auth failures

---

# 19. Security Best Practices

## Backend

- helmet
- rate limiting
- validation
- sa
