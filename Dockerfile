# ──────────────────────────────────────────────────────────────────────────────
#  Stage 1: Build React (frontend) using Node 22 + pnpm
# ──────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS frontend-builder

# Enable Corepack so pnpm is available
RUN corepack enable

WORKDIR /app/client
# Copy package.json and pnpm-lock.yaml for dependency install
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the React source and build
COPY client/ .
RUN pnpm run build

# ──────────────────────────────────────────────────────────────────────────────
#  Stage 2: Build Go (backend) using Go 1.24.3
# ──────────────────────────────────────────────────────────────────────────────
FROM golang:1.24.3-alpine AS backend-builder

# Install git and ca-certificates for module fetch and TLS
RUN apk add --no-cache git ca-certificates

WORKDIR /app/server
# Copy go.mod & go.sum first to leverage caching
COPY server/go.mod server/go.sum ./
RUN go mod download

# Copy entire server folder and compile
COPY server/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-api ./cmd/server

# ──────────────────────────────────────────────────────────────────────────────
#  Stage 3: Combine in a minimal NGINX container
# ──────────────────────────────────────────────────────────────────────────────
FROM nginx:alpine

# 1) Copy the React build into NGINX’s html root
COPY --from=frontend-builder /app/client/build /usr/share/nginx/html

# 2) Copy the Go server binary into /usr/local/bin
COPY --from=backend-builder /go-api /usr/local/bin/go-api

# 3) Copy custom NGINX config that serves static files and proxies /contact
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 4) Add an entrypoint script to start the Go API, then NGINX
COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
