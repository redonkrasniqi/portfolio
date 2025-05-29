#!/bin/bash

# Exit on error
set -e

echo "📁 Creating project root..."
mkdir -p dev-portfolio/{client,server,docs}
cd dev-portfolio

echo "📦 Initializing pnpm workspace..."
pnpm init -y
jq '. + { "private": true, "workspaces": ["client"] }' package.json > tmp.$$.json && mv tmp.$$.json package.json

echo "🚀 Setting up React + Chakra UI frontend..."
cd client
pnpm create vite . --template react-ts
pnpm install
pnpm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

cd ..

echo "🐹 Setting up Go + Fiber backend..."
cd server
go mod init github.com/yourname/dev-portfolio/server
go get github.com/gofiber/fiber/v2

cat <<EOF > main.go
package main

import (
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()
    app.Get("/health", func(c *fiber.Ctx) error {
        return c.SendString("OK")
    })
    app.Listen(":8080")
}
EOF

cd ..

echo "📝 Creating docs folder..."
echo "# Project Documentation" > docs/README.md
echo "## Architecture\n- Frontend: React + Chakra UI\n- Backend: Go + Fiber\n" > docs/architecture.md
echo "## Design Decisions\n- Monorepo via pnpm\n- Stateless backend\n" > docs/decisions.md

echo "✅ Bootstrap complete!"
