# Portfolio Monorepo

> This repository contains a full-stack portfolio website showcasing Redon’s skills, projects, and contact interface. It’s organized as a monorepo with a **React + Chakra UI** frontend and a **Go + Fiber** backend, plus documentation.

---

## 📁 Repository Structure

```
/dev-portfolio (root)
├── client/           # React frontend with Chakra UI
├── server/           # Go backend API (Fiber)
├── docs/             # Project documentation (design, architecture, decisions)
├── .editorconfig     # EditorConfig for consistent formatting
├── .gitattributes    # Git attributes (line endings, linguist overrides)
└── .gitignore        # Ignored files for Node, Go, OS, etc.
```

* **Monorepo** via [pnpm Workspaces](https://pnpm.io/workspaces): share dependencies and tooling between parts, while keeping codebases separated.
* **Client** and **Server** live side by side to simplify local development and CI/CD configuration.
* **Docs** folder collects all markdown documentation to explain architecture, design choices, and deployment steps.

---

## 🚀 Tech Stack & Rationale

| Layer      | Technology                         | Why?                                                                   |
| ---------- | ---------------------------------- | ---------------------------------------------------------------------- |
| Frontend   | React (Vite) + TypeScript          | Fast HMR, strong typing, ecosystem familiarity.                        |
| UI Library | Chakra UI                          | Accessible components, theming system, developer ergonomics.           |
| Styling    | Emotion (peer deps of Chakra)      | Seamless CSS-in-JS integration with Chakra’s theming.                  |
| Animations | Framer Motion                      | Declarative animations that integrate with Chakra props.               |
| Backend    | Go + Fiber                         | High-performance HTTP server, minimal boilerplate, familiar Go syntax. |
| Database   | (Optional) PostgreSQL or JSON file | Choose lightweight storage for portfolio data; easily replaceable.     |
| Docs       | Markdown                           | Universal format, easy to update and render on GitHub.                 |
| Formatting | ESLint + Prettier + EditorConfig   | Enforce consistent code style across editors and CI pipelines.         |
| Git Config | .gitignore, .gitattributes         | Prevent unwanted files, ensure line ending consistency cross-platform. |

---

## ⚙️ Prerequisites

* **Node.js** (LTS version)
* **pnpm** globally (`npm install -g pnpm`)
* **Go** (>= 1.18)
* **Git** CLI

---

## 🔧 Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/redonkrasniqi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   * `pnpm` manages both frontend and shared tooling. The root `package.json` declares a workspace for `client`.

3. **Configure environment**

   * Rename `.env.example` (if provided) to `.env` in `/server` and set any required variables.

---

## 🏃‍♂️ Development

### Start everything with one command

We use the [`concurrently`](https://www.npmjs.com/package/concurrently) package to launch both frontend and backend:

```bash
pnpm dev
```

* **Client**: runs on `http://localhost:5173` by default (Vite)
* **Server**: listens on `http://localhost:8080`

### Individual starts

* **Frontend** only:

  ```bash
  cd client
  pnpm dev
  ```

* **Backend** only:

  ```bash
  cd server
  go run main.go
  ```

---

## 📦 Production Build

1. **Build frontend**

   ```bash
   cd client
   pnpm build
   ```
2. **Compile backend** (optional)

   ```bash
   cd server
   go build -o bin/portfolio
   ```
3. **Serve** with your choice of static file server and run the Go binary.

---

## 🗂️ Detailed Folder Breakdown

### `/client`

* **src/**

  * `main.tsx` — app bootstrap, wraps `<App />` in `<ChakraProvider>`
  * `App.tsx` — routing via React Router, uses `<MainLayout>`
  * **layout/** — `MainLayout.tsx`, `Navbar.tsx`, `Footer.tsx`
  * **features/** — feature modules, e.g. `portfolio` page
  * **components/** — global UI primitives (e.g. `ProjectCard`)
  * **theme/** — Chakra theme config (`config.ts`, `styles.ts`, `colors.ts`, `index.ts`)
  * **api/** — shared API client wrappers (e.g. Axios)
  * **hooks/** — shared React hooks
  * **utils/** — utility functions
  * **types/** — global TypeScript type definitions

### `/server`

* `main.go` — entrypoint for Fiber server, defines basic health endpoint
* `go.mod` / `go.sum` — module dependencies
* **internal/** (expand as needed)

  * `handlers/` — HTTP handlers (e.g. `/contact`, `/projects`)
  * `models/`  — data schema definitions
  * `utils/`   — helper functions (logging, error handling)

### `/docs`

* `README.md`         — this file
* `architecture.md`   — system overview, sequence diagrams
* `decisions.md`      — key trade-offs and design decisions

---

## 📝 Configuration Files

* \`\` — ensures tabs of size 4 everywhere:

  ```ini
  root = true
  [*]
  indent_style = tab
  indent_size = 4
  end_of_line = lf
  charset = utf-8
  insert_final_newline = true
  trim_trailing_whitespace = true
  ```

* \`\` — normalizes line endings and marks docs/binaries:

  ```gitattributes
  * text=auto eol=lf
  *.go text
  *.png binary
  docs/* linguist-generated=true
  ```

* \`\` — ignores Node modules, build artifacts, OS files, Go binaries.

---

## 🤝 Contributing

1. **Fork** the repo
2. Create a new branch: `git checkout -b feature/awesome`
3. **Commit** your changes: `git commit -m "feat: add awesome feature"`
4. **Push** to your branch: `git push origin feature/awesome`
5. **Open** a Pull Request and describe your changes.

Please adhere to existing code style and add tests for any new functionality.

---

## 🎓 Why This Setup?

* **Monorepo**: simplifies dependency sharing and unified CI/CD.
* **pnpm Workspaces**: fast installs and strict versioning.
* **Chakra UI**: accessible, themeable, and composable UI building blocks.
* **Go + Fiber**: minimal, high-performance backend that's easy to reason about.
* **React Router**: straightforward client-side routing.
* **EditorConfig/Git Attributes**: enforce consistency across collaborators and platforms.

By following this structure, you ensure your portfolio code remains **clean**, **modular**, and **scalable** as your projects and content grow.
