# Flooring Website

![Angular](https://img.shields.io/badge/Angular-18-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Tunnel-F38020)

A full-stack lead-generation website for a flooring services business, built with Angular and Spring Boot. Visitors can browse services and a project gallery, submit quote requests and contact messages, which the business owner reviews and manages through a JWT-authenticated admin dashboard.

This was originally built as a client project that was later cancelled before launch; it's shared here as a portfolio piece.

---

## Live Website

🌐 https://flooring.shahirjalal.com

---

## Tech Stack

### Frontend
- Angular 18
- TypeScript
- HTML5 / CSS3

### Backend
- Spring Boot 3.3
- Java 17
- Spring Data JPA / Hibernate
- Spring Security + JWT (jjwt)

### Database
- PostgreSQL 16

### DevOps
- Docker / Docker Compose
- Jenkins
- Nginx (static hosting + reverse proxy)
- Cloudflare Tunnel

---

## Features

- Home, Services, and Portfolio (project gallery) pages
- Quote request form (address, floor type, room type, square footage, timeline)
- Contact form
- JWT-based admin login
- Admin dashboard to view, search, and update the status of contact messages and quote requests
- RESTful API, reverse-proxied through Nginx so the frontend and backend share one origin in production
- Dockerized frontend and backend with Docker Compose orchestration
- CI/CD via Jenkins

---

## Repository Structure

```
flooring-website
│
├── frontend                Angular application
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/app
│       ├── pages           home, services, portfolio, contact, quote, login, dashboard
│       └── shared           header, footer
│
├── backend                 Spring Boot application
│   ├── Dockerfile
│   └── src/main/java/com/floorservice/backend
│       ├── controller       AuthController, ContactController, QuoteController
│       ├── model            Admin, Contact, Quote
│       └── config           SecurityConfig
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | POST | Admin login, returns a JWT |
| `/api/contacts` | GET / POST | List or submit contact messages |
| `/api/contacts/{id}/status` | PATCH | Update a contact message's status |
| `/api/quotes` | GET / POST | List or submit quote requests |
| `/api/quotes/{id}/status` | PATCH | Update a quote request's status |

---

## Local Development

Clone the repository

```bash
git clone https://github.com/ShahirJalal/flooring-website.git
cd flooring-website
```

**Backend** — a local Postgres instance is enough; `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and `ADMIN_PASSWORD` all fall back to insecure dev defaults (see `application.yml`) so it runs with no setup:

```bash
cd backend
./mvnw spring-boot:run
```

Running from IntelliJ works the same way — no environment variables need to be configured in the Run Configuration for local development.

**Frontend**

```bash
cd frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`, backend API on `http://localhost:8080`.

**Or with Docker Compose** — builds and runs Postgres, backend, and frontend together:

```bash
cp .env.example .env   # fill in JWT_SECRET and ADMIN_PASSWORD
cd backend && ./mvnw clean package -DskipTests && cd ..
docker compose up --build
```

Frontend (served by Nginx, proxying `/api` to the backend) is available on `http://localhost:4200`.

---

## Deployment

Deployed the same way as my [main portfolio](https://github.com/ShahirJalal/shahir-portfolio): a Jenkins pipeline (see [Jenkinsfile](Jenkinsfile)) builds the backend jar and frontend bundle, then runs `docker compose up --build -d` on a self-hosted Ubuntu server. Nginx (inside the frontend container) serves the Angular build and reverse-proxies `/api/**` to the backend container, so the app is reachable through a single origin. A Cloudflare Tunnel exposes that origin publicly as `https://flooring.shahirjalal.com`, without opening any inbound ports on the server.

`JWT_SECRET` and `ADMIN_PASSWORD` fall back to insecure dev defaults for local convenience (see `application.yml`) — production **must** override them via `.env` (see [.env.example](.env.example)):

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Signs admin session JWTs |
| `CORS_ALLOWED_ORIGINS` | Origins allowed to call the API directly (defaults to the production domain) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Credentials for the admin dashboard login |

---

## Author

**Shahir Jalal**

Software Engineer

- LinkedIn: https://linkedin.com/in/shahirjalal
- GitHub: https://github.com/ShahirJalal
