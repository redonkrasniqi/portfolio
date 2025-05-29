import { Box, HStack, Link, Text } from "@chakra-ui/react";

/**
 * Footer sits at the bottom of every page, providing navigation and metadata.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            as="footer"
            py={4}
            bg="gray.100"
            borderTop="1px"
            borderColor="gray.200"
        >
            <HStack justify="center" spacing={6}>
                <Link href="#">Home</Link>
                <Link href="#projects">Projects</Link>
                <Link href="#contact">Contact</Link>
                <Link
                    href="https://github.com/redonkrasniqi/portfolio"
                    isExternal
                >
                    GitHub
                </Link>
            </HStack>
            <Text textAlign="center" fontSize="sm" mt={2}>
                © {currentYear} Redon Krasniqi
            </Text>
        </Box>
    );
}
