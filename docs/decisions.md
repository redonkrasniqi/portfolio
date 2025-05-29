# Design Decisions

This document captures key trade-offs and rationale behind architectural and implementation choices in the Portfolio Monorepo.

---

## 1. Monorepo vs. Polyrepo

* **Choice**: Monorepo using pnpm Workspaces
* **Why**: Simplifies dependency management and version alignment between client and server, unifies CI/CD pipelines, and eases sharing of config (ESLint, Prettier).
* **Trade-off**: Slightly larger install footprint; mitigated by pnpm’s disk efficiency.

---

## 2. Frontend Stack Selection

| Option          | Pros                                              | Cons                          |
| --------------- | ------------------------------------------------- | ----------------------------- |
| CRA + yarn/npm  | Familiar, lots of docs                            | Slower startup, larger bundle |
| **Vite + pnpm** | ⚡ Fast HMR, lightweight, modern ecosystem support | Newer tooling (less inertia)  |

* **Chakra UI**: Chosen for out-of-the-box accessibility, theming, and composable API.
* **React Router**: Industry-standard for client routing; simple to integrate.

---

## 3. Backend Stack Selection

* **Go + Fiber**: Fiber offers Express-like ergonomics in Go with minimal overhead.
* **Alternative**: Node.js + Express — would duplicate JS context but slower runtime.
* **Decision**: Go’s compiled performance and simple concurrency model outweigh initial language context switch.

---

## 4. Data Storage

* **Option**: In-memory/JSON vs. PostgreSQL
* **Choice**: Start with JSON file for simplicity.
* **Future**: Upgrade to PostgreSQL or another relational DB if dynamic data grows.

---

## 5. Theming and Styles

* **extendTheme** via `@chakra-ui/theme-tools` for modularity.
* **CSS-in-JS**: Emotion styled-system underpins Chakra; chosen for seamless integration and type safety.

---

## 6. Code Quality and Formatting

* **ESLint + Prettier + EditorConfig**: Enforce consistent formatting and catch lint issues early.
* **.gitattributes**: Ensure LF line endings to avoid cross-platform inconsistencies.

---

## 7. Single Command Dev Experience

* **concurrently** in root scripts: run frontend and backend in parallel with `pnpm dev`.
* Reduces context switching and streamlines developer flow.

---

## 8. Documentation

* **docs/** folder: keeps README concise and delegates deeper context to dedicated markdown.
* **Segregation**: `architecture.md` for structural overview; `decisions.md` for rationale and trade-offs.

---

By documenting these decisions, we ensure future maintainers (or your future self) understand the reasoning and can adapt or refactor with confidence.
