export interface Project {
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    image: string;
    github?: string;
    external?: string;
}

export const projects: Project[] = [
    {
        title: "Distributed System Visualizer",
        tagline: "Featured Project",
        description:
            "Real-time visualisation for monitoring and analysing distributed systems. Includes interactive node graphs, performance metrics and anomaly-detection tooling.",
        tech: ["React", "D3.js", "WebSockets", "Node.js"],
        image: "/images/dsv.png",
        github: "https://github.com/yourname/dsv",
    },
    {
        title: "Microservice Framework",
        tagline: "Featured Project",
        description:
            "Lightweight Go framework for deploying microservices with service discovery, load balancing and circuit breaking baked in.",
        tech: ["Go", "gRPC", "Docker", "Kubernetes"],
        image: "/images/microframe.png",
        github: "https://github.com/yourname/microframe",
    },
];

export interface ExtraProject {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    external?: string;
}

export const extraProjects: ExtraProject[] = [
    {
        title: "API Gateway",
        description:
            "A high-performance gateway with built-in authentication, rate-limiting and request transformation.",
        tech: ["Node.js", "Express", "Redis"],
        github: "https://github.com/yourname/api-gateway",
        external: undefined,
    },
    {
        title: "Database Migration Tool",
        description:
            "CLI & UI for migrating data between heterogeneous DB engines while preserving integrity.",
        tech: ["Python", "SQLAlchemy", "PostgreSQL"],
        github: "https://github.com/yourname/db-migrate",
    },
    {
        title: "Event Sourcing Framework",
        description:
            "A lightweight library for applying event-sourcing patterns in distributed systems.",
        tech: ["TypeScript", "Kafka", "MongoDB"],
        github: "https://github.com/yourname/event-sourcing",
    },
];

