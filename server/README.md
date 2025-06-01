````markdown
# Portfolio Server

This repository contains the Go backend for your portfolio project. It’s organized to promote clarity, maintainability, and easy expansion as new features are added.

## Table of Contents

1. [Quick Start](#quick-start)  
2. [Project Structure](#project-structure)  
3. [Folder Breakdown](#folder-breakdown)  
4. [How to Use This Structure Going Forward](#how-to-use-this-structure-going-forward)  
5. [Adding New Features](#adding-new-features)  
6. [Environment Variables](#environment-variables)  
7. [Testing & Deployment](#testing--deployment)

---

## Quick Start

1. **Clone the repo**  
   ```bash
   git clone https://github.com/redonkrasniqi/portfolio.git
   cd portfolio/server
````

2. **Install dependencies**

   ```bash
   go mod tidy
   ```

3. **Create a `.env` file** (see [Environment Variables](#environment-variables)).

4. **Run the server**

   ```bash
   go run ./cmd/server
   ```

   * The server listens on the port defined by `PORT` (default `8080`).
   * A health check endpoint is available at `GET /health`.

---

## Project Structure

```
server/
├── cmd/
│   └── server/
│       └── main.go
├── config/
│   └── config.go
├── handlers/
│   ├── contact.go
│   └── health.go
├── middleware/
│   └── cors.go
├── models/
│   └── contact.go
├── routes/
│   └── routes.go
├── services/
│   └── email.go
├── utils/
│   └── logger.go
├── go.mod
└── go.sum
```

---

## Folder Breakdown

* **`cmd/server/main.go`**

  * Application entry point.
  * Loads configuration, initializes the logger, sets up middleware, registers routes, and starts the Fiber server.

* **`config/`**

  * `config.go`: Reads environment variables (via `godotenv` or directly) into a global `AppConfig` struct.
  * Only one place to adjust configuration keys or defaults.

* **`handlers/`**

  * Contains HTTP handlers for each endpoint:

    * `health.go`: Simple `GET /health` handler.
    * `contact.go`: `POST /api/contact` handler that parses request, validates fields, and calls the email service.

* **`middleware/`**

  * `cors.go`: Defines CORS policy (allowed origin, allowed methods, etc.).
  * You can add other middleware (authentication checks, rate limiting) here.

* **`models/`**

  * Payload and data structs shared across handlers and services.
  * `contact.go` defines the `ContactRequest` type.

* **`routes/`**

  * `routes.go`: Binds URL paths to handler functions.
  * Receives dependencies (e.g., logger) and registers routes in a single location.

* **`services/`**

  * Business logic (e.g., sending emails).
  * `email.go` reads SMTP configuration, constructs and sends email.
  * If you swap to a transactional provider later, update only this package.

* **`utils/`**

  * Utility functions and helpers (e.g., structured logger setup).
  * `logger.go` configures and returns a Zap (or other) logger instance.

* **`go.mod / go.sum`**

  * Declares module path: `module github.com/redonkrasniqi/portfolio/server`.
  * Lists dependencies and their versions.

---

## How to Use This Structure Going Forward

1. **Keep `main.go` minimal**

   * Only load configuration, create the Fiber app, attach global middleware, and call `routes.Register(...)`.
   * Avoid placing business logic or database code directly in `main.go`.

2. **Add new endpoints by following the same pattern**

   * **Create a new handler** in `handlers/`. Parse and validate input, then invoke a service.
   * **Update `models/`** with any new request/response types.
   * **Add business logic** to `services/`. For example, if you need to store data, create a `repository/` package and have a service call it.
   * **Register the route** in `routes/routes.go` (e.g., `app.Post("/api/your-endpoint", handlers.YourHandler(logger))`).

3. **Use middleware for cross-cutting concerns**

   * Anything that applies to multiple routes (authentication, logging, CORS) lives in `middleware/`.
   * In `main.go`, attach these middleware functions before registering routes.

4. **Centralize configuration**

   * Add new environment variables in `config/config.go`.
   * Access `config.Cfg.YourKey` from anywhere in the app.

5. **Leverage the logger**

   * Import `utils.NewLogger()` in `main.go` and pass the `*zap.SugaredLogger` to handlers or services.
   * Always use structured logging (`logger.Infof`, `logger.Errorf`) instead of `fmt.Println`.

6. **Isolation of concerns**

   * **Handlers** handle request/response.
   * **Services** contain core logic (database calls, external APIs, email).
   * **Models** define data shapes.
   * This separation makes testing easier: you can write unit tests for services without invoking Fiber.

---

## Adding New Features

When you’re ready to add a new feature (e.g., a “newsletter subscription” endpoint), follow these steps:

1. **Define the request/response types**

   * Edit (or create) a new file in `models/`, e.g. `newsletter.go`:

     ```go
     package models

     type SubscribeRequest struct {
         Email string `json:"email"`
     }
     ```

2. **Create a new handler**

   * In `handlers/newsletter.go`:

     ```go
     package handlers

     import (
         "github.com/gofiber/fiber/v2"
         "go.uber.org/zap"
         "github.com/redonkrasniqi/portfolio/server/models"
         "github.com/redonkrasniqi/portfolio/server/services"
     )

     func SubscribeHandler(logger *zap.SugaredLogger) fiber.Handler {
         return func(c *fiber.Ctx) error {
             var req models.SubscribeRequest
             if err := c.BodyParser(&req); err != nil {
                 logger.Errorf("Failed to parse: %v", err)
                 return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
             }
             if req.Email == "" {
                 return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Email required"})
             }
             if err := services.SaveSubscription(req); err != nil {
                 logger.Errorf("Error saving subscription: %v", err)
                 return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not save"})
             }
             return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "subscribed"})
         }
     }
     ```

3. **Implement service logic**

   * In `services/newsletter.go`:

     ```go
     package services

     import (
         "github.com/redonkrasniqi/portfolio/server/models"
         // add database or email logic here
     )

     func SaveSubscription(req models.SubscribeRequest) error {
         // e.g., insert into a database or send a confirmation email
         return nil
     }
     ```

4. **Register the route**

   * In `routes/routes.go`, add:

     ```go
     app.Post("/api/subscribe", handlers.SubscribeHandler(logger))
     ```

5. **Update documentation & environment variables (if needed)**

   * Add any new ENV vars to `.env` and `config/config.go`.
   * Update this README with instructions for the new endpoint.

---

## Environment Variables

Create a `.env` file in the `server/` directory with at least the following keys:

```dotenv
# Server
PORT=8080

# SMTP (for sending contact form emails)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-smtp-password
CONTACT_RECEIVER=you@example.com

# CORS
ALLOWED_ORIGIN=http://localhost:3000
```

* **`PORT`**: Port on which the Fiber server listens.
* **`SMTP_*`**: Credentials for your SMTP provider (Gmail, Mailgun, etc.).
* **`CONTACT_RECEIVER`**: The email address where contact form messages should be sent.
* **`ALLOWED_ORIGIN`**: Frontend origin for CORS (e.g., `http://localhost:3000` or your production domain).

When you run locally, `github.com/joho/godotenv` will load these values. In production, set environment variables directly or via your hosting provider.

---

## Testing & Deployment

1. **Local Testing**

   * Use `go test ./services` (once you add tests) to run unit tests for services.
   * Use Fiber’s integrated testing (`httptest.NewRequest`) to write handler tests.

2. **Docker (Optional)**

   * Create a `Dockerfile` at the repo root to containerize the server:

     ```dockerfile
     FROM golang:1.20-alpine AS builder
     WORKDIR /app
     COPY . .
     RUN go mod tidy && go build -o /portfolio-server ./cmd/server

     FROM alpine:latest
     RUN apk --no-cache add ca-certificates
     WORKDIR /root/
     COPY --from=builder /portfolio-server .
     COPY .env .
     EXPOSE 8080
     CMD ["./portfolio-server"]
     ```
   * Build and run:

     ```bash
     docker build -t portfolio-server .
     docker run -d -p 8080:8080 --env-file .env portfolio-server
     ```

3. **Deploying to a VM or Cloud Service**

   * Push your code to GitHub (e.g., `github.com/redonkrasniqi/portfolio`).
   * On your server, clone the repo, configure environment variables, then run:

     ```bash
     go mod tidy
     go build -o portfolio-server ./cmd/server
     ./portfolio-server
     ```
   * Use a process manager (e.g., `systemd` or `pm2`) to keep it running, or deploy via Docker if preferred.

---

> **Tip:**
> As this project grows, you might introduce additional packages (e.g., a `repository/` layer for database interactions, or `jobs/` for background workers). Always follow the same pattern: split by concern, keep `main.go` minimal, and update `routes/` to wire new handlers.
>
> This structure ensures each piece of logic lives in exactly one place, making code easier to read, test, and maintain.
>
> Happy coding!

```
```
