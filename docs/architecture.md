# Architecture Overview

This document describes the high-level architecture of the Portfolio Monorepo, illustrating how components interact and the rationale behind major design choices.

---

## 🏗️ System Diagram

```
+-------------------+        REST        +--------------------+
|                   | <----------------> |                    |
|  React Client     |                    |  Fiber API Server  |
|  (Chakra UI)      | -- WebSockets? --> |  (Go + Fiber)      |
|                   |                    |                    |
+-------------------+                    +--------------------+
           |                                       |
           |                                       |
           v                                       v
    Static Assets                           Data Storage
   (Vite Dev Server)                       (JSON / PostgreSQL)
           |                                       |
           |                                       |
           v                                       v
      Browser                                  Persistence
  (User Interface)                           (Optional DB)
```

### Components

* **Client (React + Vite + Chakra UI)**

  * **Layout**: `MainLayout`, `Navbar`, `Footer`
  * **Features**: Modular folders under `features/`, e.g., portfolio page sections
  * **Global UI**: Reusable components in `components/`
  * **Theme**: Centralized in `theme/`, driven by `@chakra-ui/theme-tools`
  * **Routing**: `react-router-dom` for page navigation
  * **API Layer**: `api/` directory with fetch wrappers or `axios` instances

* **Server (Go + Fiber)**

  * **Endpoints**:

    * `/health` — health-check
    * `/projects` — returns portfolio data (if dynamic)
    * `/contact` — accepts form submissions
  * **Middleware**: logging, CORS, error handling
  * **Data**: Stored in-memory/JSON or connected DB (PostgreSQL) for simplicity

* **Docs**

  * Markdown files in `docs/` describe architecture, design decisions, and setup.

---

## 🔄 Data Flow

1. User loads the React app served by Vite (development) or static files (production).
2. Client requests project and contact endpoints on the Go server.
3. Fiber handlers process requests and read/write to the chosen storage.
4. Responses return JSON, client renders with Chakra components.

---

## 🚦 Deployment Considerations

* **Frontend**: Build output served via CDN or static host (Vercel, Netlify).
* **Backend**: Compile Go binary, deploy on VPS or serverless (Render, Fly.io).
* **CORS**: Allow only the frontend domain in production.
* **Environment**: Use environment variables for server port and storage path.

---

This architecture balances simplicity for a portfolio site with room to grow (e.g., adding WebSockets, real DB, or microservices in the future).
