import { Box, Heading, SimpleGrid, Link, Text, Image, VStack } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ProjectsSection() {
    const { colors } = useAppTheme();
    const { bg, textColor, border } = colors;

    return (
        <Box
            id="projects"
            minH="100vh"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
        >
            <VStack spacing={6} maxW="1000px" align="stretch">
                <Heading as="h2" size="xl" color={textColor} textAlign="center">
                    Projects
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <VStack
                        align="start"
                        p={4}
                        border="1px"
                        borderColor={border}
                        borderRadius="md"
                        spacing={3}
                        bg={bg}
                    >
                        <Image
                            src="/images/project-one.png"
                            alt="Project One Screenshot"
                            borderRadius="md"
                        />
                        <Heading as="h3" size="md" color={textColor}>
                            Dairy Cow Behavior Monitor
                        </Heading>
                        <Text fontSize="sm" color={textColor}>
                            Real‐time cow posture &amp; rumination detection on Jetson Nano using
                            YOLOv5 and DeepSORT.
                        </Text>
                        <Link href="https://github.com/redonkrasniqi/cow-monitor" color={textColor} isExternal>
                            View on GitHub
                        </Link>
                    </VStack>

                </SimpleGrid>
            </VStack>
        </Box>
    );
}
