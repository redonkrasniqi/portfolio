/* src/constants/techStack.ts */
import { type ElementType } from "react";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNodedotjs,
    SiPython,
    SiDocker,
    SiKubernetes,
    SiGo,
    SiPostgresql,
} from "react-icons/si";

/** One technology badge you can render anywhere (About, footer, etc.). */
export interface TechItem {
    /** Name that appears in the UI */
    label: string;
    /** Optional icon component (react-icons or your own)  */
    icon?: ElementType;
    /**
     * Optional link to docs, repo, or company site.
     * Leave blank if you just want plain text.
     */
    href?: string;
    /** Show in a new tab?  */
    external?: boolean;
}

/* Order them however you want to display them. */
export const techStack: TechItem[] = [
    { label: "JavaScript (ES6+)", icon: SiJavascript },
    { label: "TypeScript", icon: SiTypescript },
    { label: "React", icon: SiReact },
    { label: "Node.js", icon: SiNodedotjs },
    { label: "Python", icon: SiPython },
    { label: "Docker", icon: SiDocker },
    { label: "Kubernetes", icon: SiKubernetes },
    { label: "Go", icon: SiGo },
    { label: "PostgreSQL", icon: SiPostgresql },
];
