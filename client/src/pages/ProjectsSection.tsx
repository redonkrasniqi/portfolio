import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { projects } from "../types/projects";
import ProjectCard from "../components/ProjectCard";
import ExtraProjects from "../features/ExtraProjects";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ProjectsSection() {
    const { colors } = useAppTheme();
    const { bg, taglineColor, textColor } = colors;

    return (
        <Box id="projects" py={{ base: 12, md: 16 }} w="100%" bg={bg}>
            <Container w={{ base: "90%", md: "80%" }} maxW="none" px={{ base: 4, md: 8 }} py={16}>
                <Heading
                    size="lg"
                    mb={14}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color={textColor}
                >
                    <Text as="span" fontWeight="bold">
                        03.
                    </Text>
                    Some Things I’ve Built
                    <Box
                        flex="1"
                        h="1px"
                        bg={taglineColor}
                        display={{ base: "none", md: "block" }}
                    />
                </Heading>

                <VStack align="stretch" mb={12}>
                    {projects.map((proj, idx) => (
                        <ProjectCard key={proj.title} project={proj} idx={idx} />
                    ))}
                </VStack>

                <ExtraProjects />
            </Container>
        </Box>
    );
}
