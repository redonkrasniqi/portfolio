import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    Link,
    Icon,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";
import { type IconType } from "react-icons";
import ColorModeToggle from "../ColorModeToggle";
import { type NavLink, navLinks } from "../../types/navigation";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const bgColor = useColorModeValue("white", "gray.800");
    const dividerColor = useColorModeValue("gray.300", "gray.600");

    return (
        <Drawer placement="top" size="xs" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={bgColor}>
                <DrawerCloseButton />
                <DrawerHeader display="flex" justifyContent="center" px={0} py={6}>
                    &lt;RedonKrasniqi /&gt;
                </DrawerHeader>

                <DrawerBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                >
                    <VStack spacing={6} align="center" w="100%">
                        {navLinks.map((link: NavLink) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                isExternal={link.external}
                                rel={link.external ? link.rel : undefined}
                                fontWeight={link.isActive ? "bold" : "normal"}
                                onClick={onClose}
                            >
                                {link.icon && <Icon as={link.icon as IconType} mr={2} />}
                                {link.label}
                            </Link>
                        ))}

                        <Divider borderColor={dividerColor} w="100%" />

                        <ColorModeToggle
                            variant="full"
                            w="full"
                            justifyContent="center"
                            fontWeight="light"
                        />
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
