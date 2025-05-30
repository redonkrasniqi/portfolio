import { HStack, Link, Icon, useColorModeValue } from "@chakra-ui/react";
import { type IconType } from "react-icons";
import ColorModeToggle from "../ColorModeToggle";
import { type NavLink, navLinks } from "../../types/navigation";

export default function DesktopNav() {
    const textColor = useColorModeValue("gray.800", "white");

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
