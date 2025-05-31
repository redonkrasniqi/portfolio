import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ContactSection() {
    const { colors } = useAppTheme();
    const { bg, border, textColor, taglineColor, btnColor, btnBg, btnHoverBg } = colors;

    return (
        <Box
            id="contact"
            minH="100vh"
            w="100%"
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
        >
            <VStack spacing={6} maxW="600px" w="100%">
                <Heading as="h2" size="xl" color={textColor}>
                    Contact Me
                </Heading>

                <FormControl id="name">
                    <FormLabel color={taglineColor}>Name</FormLabel>
                    <Input
                        placeholder="Your name"
                        bg={bg}
                        borderColor={border}
                        _placeholder={{ color: textColor }}
                    />
                </FormControl>

                <FormControl id="email">
                    <FormLabel color={taglineColor}>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        bg={bg}
                        borderColor={border}
                        _placeholder={{ color: textColor }}
                    />
                </FormControl>

                <FormControl id="message">
                    <FormLabel color={taglineColor}>Message</FormLabel>
                    <Textarea
                        placeholder="Let’s connect…"
                        rows={6}
                        bg={bg}
                        borderColor={border}
                        _placeholder={{ color: textColor }}
                    />
                </FormControl>

                <Button
                    colorScheme="teal"
                    bg={btnBg}
                    color={btnColor}
                    _hover={{ bg: btnHoverBg }}
                    size="md"
                >
                    Send Message
                </Button>
            </VStack>
        </Box>
    );
}
