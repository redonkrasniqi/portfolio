import { Box, Flex, Heading, HStack, IconButton, Image, Link, Tag, Text, useBreakpointValue } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { type Project } from "../types/projects";
import { useAppTheme } from "../hooks/useAppTheme";

interface Props {
    project: Project;
    idx: number;
}

export default function ProjectCard({ project: p, idx }: Props) {
    const { colors } = useAppTheme();
    const { textColor, cardBg, taglineColor } = colors;
    const isMobile = useBreakpointValue({ base: true, md: false });
    const reverse = idx % 2 !== 0;

    return (
        <Flex
            direction={isMobile ? "column" : reverse ? "row-reverse" : "row"}
            align="center"
            gap={{ base: 6, md: 12 }}
            mb={20}
            position="relative"
        >
            <Box
                flex="1 1 55%"
                overflow="hidden"
                borderRadius="lg"
                shadow="lg"
                maxH={{ base: "220px", md: "360px" }}
            >
                <Image
                    src={p.image}
                    alt={p.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="all .3s"
                    _hover={{ transform: "scale(1.02)" }}
                />
            </Box>

            <Box
                bg={cardBg}
                color={textColor}
                p={{ base: 6, md: 8 }}
                flex="1 1 45%"
                borderRadius="lg"
                shadow="xl"
                zIndex={1}
                transform={{
                    base: "none",
                    md: reverse ? "translateX(-40px)" : "translateX(40px)",
                }}
            >
                <Text
                    fontSize="xs"
                    letterSpacing="widest"
                    mb={2}
                    color={taglineColor}
                    fontWeight="bold"
                    textTransform="uppercase"
                >
                    {p.tagline}
                </Text>

                <Heading size="md" mb={4}>
                    {p.title}
                </Heading>

                <Text fontSize="sm" mb={6} lineHeight="1.6">
                    {p.description}
                </Text>

                <HStack wrap="wrap" spacing={3} mb={6}>
                    {p.tech.map((t) => (
                        <Tag
                            key={t}
                            size="sm"
                            borderRadius="full"
                            border={`1px solid ${taglineColor}`}
                            bg="transparent"
                        >
                            {t}
                        </Tag>
                    ))}
                </HStack>

                <HStack spacing={4}>
                    {p.github && (
                        <IconButton
                            as={Link}
                            href={p.github}
                            aria-label="GitHub"
                            icon={<FaGithub />}
                            isExternal
                            variant="ghost"
                            _hover={{ color: taglineColor, bg: "transparent" }}
                        />
                    )}
                    {p.external && (
                        <IconButton
                            as={Link}
                            href={p.external}
                            aria-label="External link"
                            icon={<FiExternalLink />}
                            isExternal
                            variant="ghost"
                            _hover={{ color: taglineColor, bg: "transparent" }}
                        />
                    )}
                </HStack>
            </Box>
        </Flex>
    );
}
