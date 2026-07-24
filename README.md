# Flooring Website

![Angular](https://img.shields.io/badge/Angular-18-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-black)

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
- PostgreSQL

---

## Features

- Home, Services, and Portfolio (project gallery) pages
- Quote request form (address, floor type, room type, square footage, timeline)
- Contact form
- JWT-based admin login
- Admin dashboard to view, search, and update the status of contact messages and quote requests
- RESTful API with CORS configuration for a separately hosted frontend

---

## Repository Structure

```
flooring-website
│
├── frontend                Angular application
│   └── src/app
│       ├── pages           home, services, portfolio, contact, quote, login, dashboard
│       └── shared           header, footer
│
└── backend                 Spring Boot application
    └── src/main/java/com/floorservice/backend
        ├── controller       AuthController, ContactController, QuoteController
        ├── model            Admin, Contact, Quote
        └── config           SecurityConfig, CorsConfig
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

**Backend** — configure `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and `FRONTEND_URL` as environment variables, then:

```bash
cd backend
./mvnw spring-boot:run
```

**Frontend**

```bash
cd frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`, backend API on `http://localhost:8080`.

---

## Deployment (planned)

The intended deployment mirrors the setup used for my [main portfolio](https://github.com/ShahirJalal/shahir-portfolio): containerized with Docker, deployed via Jenkins CI/CD to a self-hosted Ubuntu server, and exposed securely through a Cloudflare Tunnel at `flooring.shahirjalal.com`.

---

## Author

**Shahir Jalal**

Software Engineer

- LinkedIn: https://linkedin.com/in/shahirjalal
- GitHub: https://github.com/ShahirJalal
