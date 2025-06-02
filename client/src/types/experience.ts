import { type ElementType } from "react";
import { SiChakraui, SiGraphql, SiPrisma, SiPostgresql, SiReact, SiNodedotjs, SiTypescript, SiGo, SiAntdesign } from "react-icons/si";

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
        company: "91 Life",
        role: "Full-Stack Engineer",
        period: "June 2024 – Present",
        companyUrl: "https://91.life",
        "bullets": [
            "Collaborated with UX designers and product owners to implement reusable React components and dynamic dashboards, leveraging Apollo Client for GraphQL data management, integrating tRPC endpoints for seamless backend communication.",
            "Built responsive clinician and administrator interfaces featuring form validation, real-time GraphQL subscriptions, and cross-browser compatibility.",
            "Authored and optimized complex GraphQL resolvers and Prisma schemas to model patient, appointment, and clinical data, reinforcing data integrity and row-level security for HIPAA compliance.",
            "Utilized Prisma and its features for type-safe database communication, managing schema migrations, and building queries; also leveraged raw PostgreSQL queries for complex operations and performance optimization.",
            "Monitored live features on GCP, quickly identifying issues and delivering fast, reliable fixes to ensure production stability and performance.",
            "Collaborated with a team distributed across multiple continents and time zones, maintaining clear communication and consistently delivering high-quality work.",
            "Participated in Agile ceremonies (sprint planning, code reviews, pair programming), driving continuous improvements in code quality, documentation, and team collaboration."
        ],
        tech: [SiGo, SiTypescript, SiReact, SiNodedotjs, SiPostgresql, SiPrisma, SiGraphql, SiChakraui, SiAntdesign],
    },
];
