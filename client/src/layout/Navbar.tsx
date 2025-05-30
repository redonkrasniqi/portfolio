import {
    Flex,
    Box,
    IconButton,
    Code,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DesktopNav, MobileNav } from "../components/Navbar";
import theme from "../theme";

export default function Navbar() {
    const bgColor = useColorModeValue(theme.colors.white, theme.colors.gray[800]);
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
                bg={bgColor}
                boxShadow="sm"
                position="sticky"
                top={0}
                zIndex={1000}
            >
                <Box fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                    <Code fontSize={{ base: "xl", md: "2xl" }}>{`<RedonKrasniqi />`}</Code>
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
