import { Box, Heading, Text, VStack, Avatar } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function AboutSection() {
    const { colors } = useAppTheme();
    const { bg, textColor, taglineColor } = colors;

    return (
        <Box
            id="about"
            minH="100vh"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
        >
            <VStack spacing={6} maxW="800px" textAlign="center">
                <Avatar name="Redon Krasniqi" size="2xl" />
                <Heading as="h2" size="xl" color={taglineColor}>
                    About Me
                </Heading>
                <Text fontSize="md" color={textColor}>
                    I’m a Full‐Stack Software Engineer and applied‐CS student, passionate about clean, scalable backends, machine learning, and edge computing.
                    Currently working on my bachelor thesis in real‐time cow behavior monitoring using YOLOv5 on Jetson Nano.
                </Text>
            </VStack>
        </Box>
    );
}
