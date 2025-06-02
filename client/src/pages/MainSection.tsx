import { Box, Container, Flex, VStack, HStack, Text, Heading, Button } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";
import CyclingAvatar from "../components/CyclingAvatar";
import { avatarPhotos } from "../types/avatarPhotos";

export default function MainSection() {
    const { colors } = useAppTheme();
    const { bg, introColor, textColor, taglineColor, paragraphColor, border, btnHoverBg } = colors;

    return (
        <Box
            id="main"
            w="100%"
            h="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={{ base: 12, md: 16 }}
        >
            <Container maxW="none" w={{ base: "90%", md: "80%" }} px={{ base: 4, md: 8 }}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="space-between"
                    w="100%"
                    gap={{ base: 10, md: 20 }}
                >
                    <VStack
                        spacing={6}
                        textAlign={{ base: "center", md: "left" }}
                        maxW={{ base: "100%", md: "900px" }}
                    >
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            letterSpacing="wider"
                            color={introColor}
                            textTransform="uppercase"
                        >
                            Hi, my name is
                        </Text>

                        <Heading
                            as="h1"
                            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                            lineHeight="tight"
                            fontWeight="extrabold"
                            color={textColor}
                        >
                            Redon Krasniqi.
                        </Heading>

                        <Heading
                            as="h2"
                            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                            fontWeight="semibold"
                            color={taglineColor}
                            maxW="700px"
                            lineHeight="shorter"
                        >
                            I solve problems
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={paragraphColor}
                            maxW="900px"
                            px={{ base: 2, md: 0 }}
                        >
                            Hi, my name is Redon Krasniqi. I solve complex problems with the same discipline I honed over 15 years playing basketball—leading teams on the court, then coaching young players to find their best game. As a member of Atomi, an institute recognizing individuals with extraordinary intelligence, I bring both strategic thinking and relentless curiosity to every codebase.
                        </Text>

                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={paragraphColor}
                            maxW="900px"
                            px={{ base: 2, md: 0 }}
                        >
                            I’m a full-stack engineer who treats architecture like a championship playbook: clean, scalable, and optimized for performance. My proudest victory to date is an edge-AI system that monitors dairy cows in real time—flagging early health risks with a YOLOv5/DeepSORT pipeline running on NVIDIA Jetson Nano hardware. That project proved that elegant, maintainable code can deliver life-changing insights in agriculture.
                        </Text>

                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={paragraphColor}
                            maxW="900px"
                            px={{ base: 2, md: 0 }}
                        >
                            I’ve also built and shipped features on a large-scale React + GraphQL healthcare platform (Prisma / PostgreSQL), wrote automated DB migrations, and introduced end-to-end tracing with OpenTelemetry. I thrive on automating the repetitive so people can focus on what matters most—whether that’s dev-ops, data pipelines, or clinical workflows.
                        </Text>

                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={paragraphColor}
                            maxW="900px"
                            px={{ base: 2, md: 0 }}
                        >
                            I’m seeking new opportunities to collaborate on open‐source projects and innovate state-of-the-art solutions. If you’re looking for someone who combines high-IQ problem solving with real-world leadership, let’s connect and build something remarkable together.
                        </Text>


                        <HStack spacing={4} pt={4}>
                            <Button
                                as="a"
                                href="#projects"
                                size="lg"
                                bg={border}
                                color="white"
                                _hover={{ bg: "white", color: border }}
                            >
                                Find My Work
                            </Button>
                            <Button
                                as="a"
                                href="#contact"
                                size="lg"
                                bg={border}
                                color="white"
                                _hover={{ bg: "white", color: border }}
                            >
                                Get In Touch
                            </Button>
                        </HStack>
                    </VStack>

                    <CyclingAvatar
                        photos={avatarPhotos}
                        size={{ base: "300px", md: "400px" }}
                    />
                </Flex>
            </Container>
        </Box>
    );
}
