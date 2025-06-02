import { Box, Container, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ContactSection() {
    const { colors } = useAppTheme();
    const { bg, border, textColor, taglineColor, btnColor, btnBg, btnHoverBg, inputBg } = colors;

    return (
        <Box
            id="contact"
            py={{ base: 12, md: 16 }}
            // w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container maxW="600px" w={{ base: "90%", md: "80%" }} px={{ base: 4, md: 8 }} py={16}>
                <VStack spacing={6} w="100%">
                    <Heading as="h2" size="xl" color={textColor} mb={4}>
                        Let's Work Together
                    </Heading>
                    <FormControl id="name">
                        <FormLabel color={taglineColor}>Name</FormLabel>
                        <Input
                            placeholder="Your name"
                            bg={inputBg}
                            borderColor={border}
                            color={textColor}
                            _placeholder={{ color: taglineColor }}
                            _focus={{ borderColor: taglineColor }}
                            borderRadius="md"
                        />
                    </FormControl>

                    <FormControl id="email">
                        <FormLabel color={taglineColor}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            bg={inputBg}
                            borderColor={border}
                            color={textColor}
                            _placeholder={{ color: taglineColor }}
                            _focus={{ borderColor: taglineColor }}
                            borderRadius="md"
                        />
                    </FormControl>

                    <FormControl id="message">
                        <FormLabel color={taglineColor}>Message</FormLabel>
                        <Textarea
                            placeholder="Let’s connect…"
                            rows={6}
                            bg={inputBg}
                            borderColor={border}
                            color={textColor}
                            _placeholder={{ color: taglineColor }}
                            _focus={{ borderColor: taglineColor }}
                            borderRadius="md"
                        />
                    </FormControl>

                    <Button
                        bg={border}
                        color="white"
                        _hover={{ bg: "white", color: border }}
                        size="lg"
                        w="100%"
                    >
                        Send Message
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
