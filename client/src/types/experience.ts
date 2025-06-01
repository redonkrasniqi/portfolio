import { type ElementType } from "react";
import { SiChakraui, SiGraphql, SiPrisma, SiPostgresql } from "react-icons/si";

export interface Experience {
    /** Company name (used in the left-hand list) */
    company: string;
    /** Job title to display in the detail pane */
    role: string;
    /** “Jan 2024 – Present”, “May 2023 – Aug 2023”, etc. */
    period: string;
    /** Optional link to the company site */
    companyUrl?: string;
    /** Bullet-point achievements (max 5-6) */
    bullets: string[];
    /** Optional icons of key tech used (for flair) */
    tech?: ElementType[];
}

export const experiences: Experience[] = [
    {
        company: "Healthcare Platform",
        role: "Junior Full-Stack Engineer",
        period: "Mar 2025 – Present",
        companyUrl: "https://example-health.com",
        bullets: [
            "Shipped features on a large-scale React + GraphQL platform with Prisma & PostgreSQL.",
            "Cut critical REST endpoints’ p95 latency by 38 % through query optimisation & batching.",
            "Authored automated DB-migration scripts and improved CI build time by ~30 %.",
            "Championed end-to-end tracing with OpenTelemetry, boosting debuggability across teams.",
        ],
        tech: [SiGraphql, SiPrisma, SiPostgresql],
    },
    {
        company: "Construction Products Co.",
        role: "Software Engineer Intern",
        period: "Jan 2025 – Mar 2025",
        bullets: [
            "Built a stock-management system in Node.js/TypeScript that generates tax / monthly reports.",
            "Integrated real-time inventory tracking and automated email billing alerts, reducing out-of-stock incidents by 20 %.",
        ],
        tech: [SiChakraui],
    },
];
