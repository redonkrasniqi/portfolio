import { Box, VStack, Text, Heading, Button } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function MainSection() {
    const { colors } = useAppTheme();
    const { bg, introColor, textColor, taglineColor, paragraphColor, btnBg, btnHoverBg, btnColor } = colors;

    return (
        <Box
            id="main"
            minH="100vh"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
        >
            <VStack spacing={6} maxW="800px" textAlign="center">
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
                    fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
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
                    maxW="600px"
                    px={{ base: 2, md: 0 }}
                >
                    I’m a full-stack engineer who treats every codebase like a championship playbook—structured, disciplined, and built to win in overtime. My proudest victory: an edge-AI system that watches dairy cows in real time to flag early health risks, proving that clean architecture can protect both uptime and bottom lines. Next up, I’m bringing that same puzzle-solver’s grit to a healthcare platform poised to rewrite the industry’s rules—automating the repetitive so people can focus on what matters most.
                </Text>

                <Button
                    as="a"
                    href="#projects"
                    size="lg"
                    bg={btnBg}
                    color={btnColor}
                    _hover={{ bg: btnHoverBg }}
                >
                    View My Work
                </Button>
            </VStack>
        </Box>
    );
}
