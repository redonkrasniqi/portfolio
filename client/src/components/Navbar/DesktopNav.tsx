import { HStack, Link, Icon } from "@chakra-ui/react";
import { type IconType } from "react-icons";
import ColorModeToggle from "../ColorModeToggle";
import { type NavLink, navLinks } from "../../types/navigation";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function DesktopNav() {
    const { colors } = useAppTheme();
    const { textColor } = colors;

    return (
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link: NavLink) => (
                <Link
                    key={link.label}
                    href={link.href}
                    isExternal={link.external}
                    rel={link.external ? link.rel : undefined}
                    fontWeight={link.isActive ? "bold" : "normal"}
                    color={textColor}
                >
                    {link.icon && <Icon as={link.icon as IconType} mr={2} />}
                    {link.label}
                </Link>
            ))}
            <ColorModeToggle size="md" />
        </HStack>
    );
}
