import { Flex, Box, HStack, Link, Code } from "@chakra-ui/react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

/**
 * Navbar provides site-wide navigation with links to key sections.
 */
export default function Navbar() {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            px={8}
            py={4}
            bg="white"
            boxShadow="sm"
            position="sticky"
            top={0}
            zIndex={1000}
        >
            <Box fontWeight="bold" fontSize="xl">
                <Code fontSize="2xl">{'<RedonKrasniqi />'}</Code>
            </Box>
            <HStack spacing={8} display={{ base: "none", md: "flex" }}>
                {navLinks.map((link) => (
                    <Link key={link.label} href={link.href} fontWeight="medium">
                        {`<${link.label}>`}
                    </Link>
                ))}
            </HStack>
        </Flex>
    );
}
