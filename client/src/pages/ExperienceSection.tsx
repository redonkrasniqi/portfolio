import { Box, Heading, VStack, Text, StackDivider } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ExperienceSection() {
    const { colors } = useAppTheme();
    const { bg, textColor, taglineColor, divider } = colors;

    return (
        <Box
            id="experience"
            minH="100vh"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
        >
            <VStack
                spacing={6}
                divider={<StackDivider borderColor={divider} />}
                maxW="800px"
                align="stretch"
            >
                <Heading as="h2" size="xl" color={textColor} textAlign="center">
                    Experience
                </Heading>

                <Box>
                    <Heading as="h3" size="md" color={textColor}>
                        Junior Full‐Stack Engineer @ Healthcare Platform
                    </Heading>
                    <Text fontSize="sm" color={taglineColor}>
                        Mar 2025 – Present
                    </Text>
                    <Text mt={2} color={textColor}>
                        • Contributed to a large‐scale healthcare application using React, GraphQL, Prisma, and PostgreSQL.
                        • Optimized API performance and helped design database schemas.
                    </Text>
                </Box>

                <Box>
                    <Heading as="h3" size="md" color={textColor}>
                        Software Engineer Intern @ Construction Products Co.
                    </Heading>
                    <Text fontSize="sm" color={taglineColor}>
                        Jan 2025 – Mar 2025
                    </Text>
                    <Text mt={2} color={textColor}>
                        • Built a stock‐management system in Node.js/TypeScript, generating tax and monthly reports.
                        • Integrated real‐time inventory tracking and automated email alerts.
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}
