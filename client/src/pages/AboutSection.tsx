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
                                I’m Redon, a full-stack engineer and applied-CS student obsessed
                                with clean, scalable systems and pragmatic performance. I cut my
                                teeth on web apps in college and recently shipped a real-time
                                dairy-cow monitoring platform on the Jetson Nano.
                            </Text>
                            <Text>
                                These days I architect maintainable codebases that evolve with
                                business needs—balancing deep tech knowledge with a “will this
                                still work tomorrow?” mindset.
                            </Text>
                            <Text>Here are a few technologies I’ve been using lately:</Text>
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
