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
   * A health‐check endpoint is available at `GET /health`.

---

## Project Structure

```
server/
├── cmd/
│   └── server/
│       └── main.go           ← loads .env, config, logger → registers routes → starts net/http server
├── config/
│   └── config.go             ← LoadSMTPConfig() reads env vars into a struct
├── handlers/
│   ├── contact.go            ← `POST /contact`: parses JSON, validates, calls email service
│   └── health.go             ← `GET /health`: returns `{"status":"healthy"}`
├── middleware/
│   └── cors.go               ← very basic CORS policy (allows all origins)
├── models/
│   └── contact.go            ← `ContactRequest` struct with JSON tags
├── routes/
│   └── routes.go             ← wires `/health` and `/contact` into a Chi router
├── services/
│   └── email.go              ← `SendContactEmail` via SMTP (go-mail/mail/v2)
├── utils/
│   └── logger.go             ← constructs a `*zap.SugaredLogger`
├── go.mod
└── go.sum
```

---

## Folder Breakdown

### `cmd/server/main.go`

* Application entry point.
* Calls `godotenv.Load()` to read `.env` (if present).
* Calls `config.LoadSMTPConfig()` to load SMTP credentials.
* Creates a SugaredLogger via `utils.NewLogger()`.
* Registers routes in `routes.RegisterRoutes(logger, smtpCfg)`.
* Starts an `http.Server` on `:{PORT}` (with default timeouts).

### `config/`

* `config.go`: Defines `SMTPConfig` and `LoadSMTPConfig()`, which reads:

  * `SMTP_HOST`
  * `SMTP_PORT`
  * `SMTP_USER`
  * `SMTP_PASS`
  * `CONTACT_TO`
  * `PORT` (fallback to `8080` if unset)
* Centralizes all environment‐variable logic in one place.

### `handlers/`

* **`health.go`**:

  ```go
  func HealthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(`{"status":"healthy"}`))
  }
  ```
* **`contact.go`**:

  ```go
  func ContactHandler(smtpCfg *config.SMTPConfig) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
      if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
      }
      var req models.ContactRequest
      if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, `{"error":"invalid JSON payload"}`, http.StatusBadRequest)
        return
      }
      if req.Name == "" || req.Email == "" || req.Message == "" {
        http.Error(w, `{"error":"name, email, and message are required"}`, http.StatusBadRequest)
        return
      }
      if err := services.SendContactEmail(smtpCfg, &req); err != nil {
        http.Error(w, `{"error":"failed to send email"}`, http.StatusInternalServerError)
        return
      }
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
      w.Write([]byte(`{"status":"ok"}`))
    }
  }
  ```

### `middleware/`

* **`cors.go`**:

  ```go
  func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
      w.Header().Set("Access-Control-Allow-Origin", "*")
      w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
      if r.Method == http.MethodOptions {
        w.WriteHeader(http.StatusNoContent)
        return
      }
      next.ServeHTTP(w, r)
    })
  }
  ```
* All cross‐cutting HTTP concerns (CORS, logging, metrics) should live here.

### `models/`

* **`contact.go`**:

  ```go
  type ContactRequest struct {
    Name    string `json:"name"`
    Email   string `json:"email"`
    Message string `json:"message"`
  }
  ```
* Holds all request/response payload definitions.

### `routes/`

* **`routes.go`**:

  ```go
  func RegisterRoutes(smtpCfg *config.SMTPConfig, logger *zap.SugaredLogger) *chi.Mux {
    r := chi.NewRouter()
    // Chi’s own middleware
    r.Use(chiMiddleware.Logger)
    r.Use(chiMiddleware.Recoverer)
    r.Use(chiMiddleware.RequestID)
    r.Use(chiMiddleware.RealIP)
    r.Use(chiMiddleware.NoCache)
    r.Use(chiMiddleware.StripSlashes)
    // Custom CORS
    r.Use(mw.CORS)

    r.Get("/health", handlers.HealthHandler)
    r.Post("/contact", handlers.ContactHandler(smtpCfg))
    return r
  }
  ```
* Centralizes all route registration in one place.
* Always pass dependencies (logger, config) into routes instead of globals.

### `services/`

* **`email.go`**:

  ```go
  func SendContactEmail(cfg *config.SMTPConfig, req *models.ContactRequest) error {
    m := mail.NewMessage()
    m.SetHeader("From", cfg.Username)
    m.SetHeader("To", cfg.ToEmail)
    m.SetHeader("Reply-To", req.Email)
    m.SetHeader("Subject", fmt.Sprintf("New contact from %s", req.Name))
    body := fmt.Sprintf("Name: %s\nEmail: %s\n\n%s", req.Name, req.Email, req.Message)
    m.SetBody("text/plain", body)
    d := mail.NewDialer(cfg.Host, cfg.Port, cfg.Username, cfg.Password)
    return d.DialAndSend(m)
  }
  ```
* Contains all non‐HTTP logic (sending email).
* Swap out implementation (SMTP, SendGrid API, etc.) here without touching handlers.

### `utils/`

* **`logger.go`**:

  ```go
  func NewLogger() *zap.SugaredLogger {
    logger, err := zap.NewProduction()
    if err != nil {
      panic(err)
    }
    return logger.Sugar()
  }
  ```
* Configures and returns a `*zap.SugaredLogger` for structured logging.
* Pass this logger into handlers/services to avoid using `fmt.Println`.

### `go.mod / go.sum`

* Declares `module github.com/redonkrasniqi/portfolio/server`.
* Lists all dependencies (chi, go-mail, zap, godotenv, etc.).

---

## How to Use This Structure Going Forward

1. **Keep `main.go` minimal**

   * Only load environment variables, create the logger, register routes, and start the server.
   * No business logic or database calls in `main.go`.

2. **Add new endpoints by following the same pattern**

   1. **Define request/response types** in `models/`.
   2. **Create a handler** in `handlers/` that:

      * Parses JSON via `json.NewDecoder(r.Body).Decode(&req)`.
      * Validates required fields.
      * Calls a function in `services/` (business logic).
      * Returns JSON (e.g., `w.Write([]byte(...))`).
   3. **Register the route** in `routes/routes.go` (e.g., `r.Post("/your-path", handlers.YourHandler(smtpCfg))`).

3. **Use middleware for cross‐cutting concerns**

   * CORS, logging, authentication, rate‐limiting, etc., all live in `middleware/`.
   * Attach them once in `routes.RegisterRoutes(...)`.

4. **Centralize configuration**

   * Add new environment variables in `config/config.go` and `.env`.
   * Access via `config.LoadSMTPConfig()` or add new functions for other configs.

5. **Leverage the logger**

   * Call `logger := utils.NewLogger()` in `main.go`.
   * Pass `logger` into route registration or directly into handlers/services.
   * Use `logger.Infof()`, `logger.Errorf()`, etc., instead of `fmt.Println`.

6. **Isolation of concerns**

   * **Handlers** handle HTTP request/response.
   * **Services** implement business logic (DB, external APIs, email, etc.).
   * **Models** define data shapes.
   * This separation makes unit testing easier: test services without invoking HTTP stack.

---

## Adding New Features

When you need to add a feature (e.g. “newsletter subscription”), follow these steps:

1. **Define the request/response type**

   * Create `models/newsletter.go`:

     ```go
     package models

     type SubscribeRequest struct {
       Email string `json:"email"`
     }
     ```

2. **Create a handler**

   * Add `handlers/newsletter.go`:

     ```go
     package handlers

     import (
       "encoding/json"
       "net/http"

       "github.com/redonkrasniqi/portfolio/server/config"
       "github.com/redonkrasniqi/portfolio/server/models"
       "github.com/redonkrasniqi/portfolio/server/services"
     )

     func SubscribeHandler(cfg *config.SMTPConfig) http.HandlerFunc {
       return func(w http.ResponseWriter, r *http.Request) {
         if r.Method != http.MethodPost {
           http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
           return
         }
         var req models.SubscribeRequest
         if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
           http.Error(w, `{"error":"invalid JSON"}`, http.StatusBadRequest)
           return
         }
         if req.Email == "" {
           http.Error(w, `{"error":"email required"}`, http.StatusBadRequest)
           return
         }
         if err := services.SaveSubscription(req); err != nil {
           http.Error(w, `{"error":"could not save subscription"}`, http.StatusInternalServerError)
           return
         }
         w.Header().Set("Content-Type", "application/json")
         w.WriteHeader(http.StatusOK)
         w.Write([]byte(`{"status":"subscribed"}`))
       }
     }
     ```

3. **Implement service logic**

   * Add `services/newsletter.go`:

     ```go
     package services

     import "github.com/redonkrasniqi/portfolio/server/models"

     func SaveSubscription(req models.SubscribeRequest) error {
       // For example: insert into a database or send a confirmation email
       return nil
     }
     ```

4. **Register the route**

   * In `routes/routes.go`, add:

     ```go
     r.Post("/subscribe", handlers.SubscribeHandler(smtpCfg))
     ```

5. **Update documentation & environment variables**

   * If you need new ENV vars, add them to `.env` and `config/config.go`.
   * Document the new endpoint in this README.

---

## Environment Variables

Create a `.env` file in the `server/` directory with at least:

```dotenv
# Server
PORT=8080

# SMTP (for sending contact form emails)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-smtp-password
CONTACT_TO=you@example.com
```

* `PORT`: Port on which the HTTP server listens (defaults to `8080` if unset).
* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Credentials for your SMTP provider (Gmail, Mailgun, etc.).
* `CONTACT_TO`: The email address that receives contact form submissions.

> **Note:** The CORS middleware currently allows all origins (`*`). If you want to restrict to a specific origin (e.g. your React app), update `middleware/cors.go` accordingly and remove the wildcard in this README.

---

## Testing & Deployment

### Local Testing

* **Unit tests**:

  ```bash
  go test ./config
  go test ./handlers
  go test ./middleware
  go test ./models
  go test ./services
  go test ./utils
  go test ./routes
  ```
* **Integration**:

  1. Run `go run ./cmd/server`.
  2. In another terminal, run:

     ```bash
     curl -i http://localhost:8080/health
     curl -i -X POST http://localhost:8080/contact \
       -H "Content-Type: application/json" \
       -d '{"name":"Alice","email":"alice@example.com","message":"Hello"}'
     ```
  3. Verify the email arrives (or appears in MailHog if you use a local SMTP server).

### Docker (Optional)

Create a `Dockerfile` at `portfolio/server/Dockerfile`:

```dockerfile
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /portfolio-server ./cmd/server

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /portfolio-server .
COPY .env .
EXPOSE 8080
CMD ["./portfolio-server"]
```

Build and run:

```bash
docker build -t portfolio-server .
docker run -d -p 8080:8080 --env-file .env portfolio-server
```

### Deploying to a VM or Cloud Service

1. Push code to GitHub (e.g. `github.com/redonkrasniqi/portfolio`).
2. On your server or CI runner, clone the repo, then:

   ```bash
   cd portfolio/server
   go mod tidy
   go build -o portfolio-server ./cmd/server
   ./portfolio-server
   ```
3. Use a process manager (e.g. `systemd`, `supervisord`) or Docker to keep it running.

---

> **Tip:** As this project grows, you might introduce additional layers (e.g., `repository/` for database interactions, `jobs/` for background tasks). Always keep `main.go` minimal, place business logic in `services/`, and register new routes in `routes/`. This approach ensures each concern lives in exactly one place, making code easier to read, test, and maintain.

Happy coding!
