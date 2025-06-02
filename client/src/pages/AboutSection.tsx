import { Box, Container, Flex, Heading, Text, VStack, Image, SimpleGrid, HStack } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";
import { techStack } from "../types/techStack";

export default function AboutSection() {
    const { colors } = useAppTheme();
    const { bg, textColor, taglineColor, border } = colors;

    return (
        <Box
            id="about"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            py={{ base: 12, md: 16 }}
        >
            <Container maxW="none" w={{ base: "90%", md: "80%" }} px={{ base: 4, md: 8 }}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="flex-start"
                    justify="center"
                    w="100%"
                    gap={{ base: 10, md: 16 }}
                >
                    <Box flex="1">
                        <Heading
                            as="h2"
                            size="lg"
                            mb={6}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            color={taglineColor}
                        >
                            <Text as="span" fontWeight="bold" color={textColor}>
                                01.
                            </Text>
                            About Me
                            <Box
                                flex="1"
                                h="1px"
                                bg={taglineColor}
                                display={{ base: "none", md: "block" }}
                            />
                        </Heading>

                        <VStack align="start" spacing={4} color={textColor}>
                            <Text>
                                I studied applied computer science at Constructor University, focusing on software architecture and real-world problem solving. During my coursework, I designed and implemented a scalable microservice framework that emphasized service discovery and circuit breaking—laying the foundation for my obsession with reliable, maintainable systems.
                            </Text>
                            <Text>
                                Beyond academics, I’ve taken on mentoring roles in student-led coding clubs, helping peers build clean React/TypeScript applications and understand backend concepts. Teaching others reinforced my belief that clear documentation and testing are just as important as writing code.
                            </Text>
                            <Text>
                                In my spare time, I explore trending GitHub repositories, keep up with technological advancements, and watch documentaries on various topics. My goal is to translate innovative research into practical tools that teams can adopt immediately.
                            </Text>
                            <Text>
                                If you’re interested in collaborating on projects that blend cutting-edge technology with real-world impact—whether it’s improving deployment workflows, building data-driven dashboards, or crafting command-line utilities—let’s connect. I’m always looking to learn, share, and create alongside others.
                            </Text>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mt={4}>
                            {techStack.map(({ label, icon: Icon }) => (
                                <HStack key={label} spacing={2}>
                                    {Icon && <Icon aria-label={label} />}
                                    <Text color={textColor}>{label}</Text>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box flexShrink={0} alignSelf={{ base: "center", md: "flex-start" }}>
                        <Image
                            src="/Profile.png"
                            alt="Redon Krasniqi"
                            boxSize={{ base: "240px", md: "300px" }}
                            objectFit="cover"
                            borderRadius="md"
                            border={border}
                            boxShadow={`0 0 0 4px ${border}, 0 0 20px ${border}`}
                        />
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
