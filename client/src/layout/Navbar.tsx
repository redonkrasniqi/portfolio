import { Flex, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DesktopNav, MobileNav, NameBlock } from "../components/Navbar";
import theme from "../theme";
import { useAppTheme } from "../hooks/useAppTheme";

export default function Navbar() {
    const { colors } = useAppTheme();
    const { bg } = colors;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                as="nav"
                w="100vw"
                justify="space-between"
                align="center"
                px={{ base: theme.space[4], md: theme.space[8], lg: theme.space[16] }}
                py={theme.space[4]}
                bg={bg}
                boxShadow="sm"
                position="sticky"
                top={0}
                zIndex={1000}
            >
                <Box fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                    <NameBlock />
                </Box>

                <DesktopNav />

                <IconButton
                    aria-label="Open menu"
                    icon={<HamburgerIcon />}
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                    variant="ghost"
                    size="md"
                />
            </Flex>

            <MobileNav isOpen={isOpen} onClose={onClose} />
        </>
    );
}
