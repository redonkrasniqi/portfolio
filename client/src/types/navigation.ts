import { type ElementType } from 'react';
import { FaTwitter, FaGithub, FaReddit, FaEnvelope } from 'react-icons/fa';

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

export const footerNavLinks: NavLink[] = [
    {
        label: '',
        href: 'https://github.com/redonkrasniqi/portfolio',
        external: true,
        rel: 'noopener noreferrer',
        icon: FaGithub,
    },
    {
        label: '',
        href: 'https://twitter.com/1r3don',
        external: true,
        rel: 'noopener noreferrer',
        icon: FaTwitter,
    },
    {
        label: '',
        href: 'mailto:krasniqiredon2004@gmail.com',
        icon: FaEnvelope,
    },
    {
        label: '',
        href: 'https://reddit.com/user/Any_Ad3655',
        external: true,
        rel: 'noopener noreferrer',
        icon: FaReddit,
    },
];
