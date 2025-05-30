import { type ElementType } from 'react';

export interface NavLink {
    /** Text to display */
    label: string;
    /** URL or hash to navigate to */
    href: string;
    /** If true, opens in a new tab with appropriate rel */
    external?: boolean;
    /** Optional rel attribute for external links */
    rel?: string;
    /** Marks the link as active for styling */
    isActive?: boolean;
    /** Optional icon component to render alongside the label */
    icon?: ElementType;
}

export const navLinks: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
];
