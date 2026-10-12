# Job Application Tracker

A full-stack web application to track job applications, interview stages, and outcomes — built during an active job search in Germany.

> **Status:** Core backend complete. Frontend partially implemented — list view working, add/edit/delete planned.

---

## Motivation

Managing job applications in a spreadsheet quickly became unmanageable. I built this tool to solve my own problem while simultaneously learning React and practicing full-stack architecture from scratch.

---

## Tech Stack

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** (Code-First migrations)
- **PostgreSQL** (Docker)
- **ASP.NET Identity** + **JWT Bearer** authentication
- **Swagger / OpenAPI**

### Frontend
- **React 18** + **TypeScript**
- **Vite**
- **React Router v6**
- **Axios** (with interceptor for automatic token injection)

### Infrastructure
- **Docker** (PostgreSQL container)
- **GitHub** (version controlled from day one)

---

## Features

### Backend (Complete)
- User registration and login with JWT authentication
- REST API with full CRUD endpoints for applications and interviews
- ASP.NET Identity for user management and password hashing
- Swagger UI for API exploration and testing

### Frontend (Partial)
- Login and register pages with error handling
- Protected routes — unauthenticated users redirected to login
- Application list page — fetches data from REST API
- Axios interceptor — JWT token automatically attached to every request

### Planned
- Add / edit / delete applications via modal form
- Status tracking: Applied → Interview → Offer / Rejected
- Filter by status and date
- Dashboard with summary statistics

---

## Architecture

```
JobTracker/
├── JobTracker.API/
│   ├── Controllers/          # ApplicationsController, AuthController
│   ├── Entities/             # Application, Interview (EF Core models)
│   ├── DTOs/                 # Request/response transfer objects
│   ├── Data/                 # AppDbContext (IdentityDbContext)
│   └── Program.cs            # DI registration, middleware pipeline
└── frontend/
    ├── src/
    │   ├── pages/            # LoginPage, RegisterPage, ApplicationsPage, DashboardPage
    │   ├── components/       # ProtectedRoute
    │   ├── services/         # authService, applicationService, axiosInstance
```

---

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js 18+](https://nodejs.org)

### 1. Start the database

```bash
docker run --name jobtracker-db \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 2. Run the backend

```bash
cd JobTracker.API
dotnet ef database update
dotnet run
```

API available at `https://localhost:7164`  
Swagger UI at `https://localhost:7164/swagger`

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login, returns JWT token |
| GET | `/api/applications` | ✓ | List all applications |
| POST | `/api/applications` | ✓ | Add a new application |
| PUT | `/api/applications/{id}` | ✓ | Update an application |
| DELETE | `/api/applications/{id}` | ✓ | Delete an application |

---

## Design Decisions

**Why React instead of Angular?**  
Angular was used in previous roles, but React has significantly higher demand in the German job market, particularly at startups and scale-ups. This project was a deliberate opportunity to learn React on a real problem.

**Why Docker for the database?**  
Avoids environment-specific PostgreSQL installation issues and makes the project portable — anyone can run it with a single command.

**Why separate DTOs from Entities?**  
To avoid exposing internal domain models directly through the API. DTOs decouple the API contract from the database schema, preventing accidental data leaks and making changes safer.
