import { Box, Heading, HStack, IconButton, Link, Tag, Text, VStack } from "@chakra-ui/react";
import { FiExternalLink, FiFolder } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { type ExtraProject } from "../types/projects";
import { useAppTheme } from "../hooks/useAppTheme";

interface Props {
    project: ExtraProject;
}

export default function ExtraProjectCard({ project }: Props) {
    const { colors } = useAppTheme();
    const { cardBg, textColor, taglineColor } = colors;

    return (
        <Box
            bg={cardBg}
            color={textColor}
            p={6}
            borderRadius="lg"
            shadow="lg"
            role="group"
            transition="all .2s"
            _hover={{ transform: "translateY(-4px)" }}
        >
            <HStack justify="space-between" mb={6}>
                <FiFolder size="28" color={taglineColor} />

                <HStack spacing={3} opacity={0.8} _groupHover={{ opacity: 1 }}>
                    {project.github && (
                        <IconButton
                            as={Link}
                            href={project.github}
                            aria-label="GitHub"
                            icon={<FaGithub />}
                            variant="ghost"
                            isExternal
                            _hover={{ color: taglineColor, bg: "transparent" }}
                        />
                    )}
                    {project.external && (
                        <IconButton
                            as={Link}
                            href={project.external}
                            aria-label="External link"
                            icon={<FiExternalLink />}
                            variant="ghost"
                            isExternal
                            _hover={{ color: taglineColor, bg: "transparent" }}
                        />
                    )}
                </HStack>
            </HStack>

            <VStack align="start" spacing={3}>
                <Heading size="sm">{project.title}</Heading>
                <Text fontSize="sm">{project.description}</Text>
            </VStack>

            <HStack wrap="wrap" spacing={2} mt={6}>
                {project.tech.map((t) => (
                    <Tag
                        key={t}
                        size="sm"
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg="transparent"
                        border={`1px solid ${taglineColor}`}
                        color={textColor}
                        lineHeight="1"
                    >
                        {t}
                    </Tag>
                ))}
            </HStack>
        </Box>
    );
}
