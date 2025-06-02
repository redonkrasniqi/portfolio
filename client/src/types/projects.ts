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
        title: "Real-Time Dairy Cow Behavior Monitoring Using Deep Learning on Edge Devices",
        tagline: "Featured Project",
        description:
            "A deep-learning edge-AI pipeline that detects and tracks dairy cow posture (standing, lying) and rumination in real time. Utilizes YOLOv5 for object detection, DeepSORT for multi-object tracking, and runs on NVIDIA Jetson Nano to log behavior data, generate alerts for health anomalies, and synchronize summaries to a cloud dashboard.",
        tech: ["Python", "PyTorch", "YOLOv5", "DeepSORT", "NVIDIA Jetson Nano", "Docker"],
        image: "/ThesisPosterLandscape.png",
        // github: "https://github.com/redonkrasniqi/",
    },
    {
        title: "Personal Expense Tracker",
        tagline: "Featured Project",
        description:
            "A full-stack application to track personal finances: log and categorize transactions, visualize spending trends, and forecast future expenses using predictive analytics. Supports adding, editing, and deleting expenses through an intuitive form and dynamically generates charts to highlight income vs. spending patterns. Integrates predictive models to identify recurring payments and alert users to potential budget overruns.",
        tech: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
        image: "/PersonalExpenseTracker.png",
        github: "https://github.com/redonkrasniqi/Personal-Expense-Tracker",
    }
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
        title: "Healthcare Platform Enhancements",
        description:
            "Shipped front-end features using React, leveraging GraphQL and tRPC for data fetching and state management; on the back end, developed tRPC API endpoints and implemented Temporal workflows to orchestrate long-running processes.",
        tech: ["React", "GraphQL", "Prisma", "PostgreSQL", "tRPC", "Temporal"],
        external: undefined,
    },
    {
        title: "Medical Devices Integration",
        description:
            "Built a TypeScript/Node.js service to integrate HL7-based device data from different cardiac devices into our healthcare backend. Parsed and validated incoming HL7 messages, transformed them into our internal GraphQL and tRPC mutations, and ensured data consistency by implementing automated tests and schema validations.",
        tech: ["Node.js", "TypeScript", "HL7", "GraphQL", "tRPC"],
        external: undefined,
    },
    {
        title: "Newsletter Back‐end Service",
        description:
            "Created a back‐end microservice in TypeScript that reads .docx files, converts them to HTML via the mammoth library, and stores the generated HTML in a PostgreSQL database. Designed a simple REST API for uploading and retrieving articles, integrated Prisma as the ORM, and added validation to prevent malformed documents from being saved.",
        tech: ["TypeScript", "Node.js", "mammoth", "Prisma", "PostgreSQL"],
        external: undefined,
    },
];


