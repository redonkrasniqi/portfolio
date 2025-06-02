// src/components/ContactSection.tsx
import React, { useState } from "react";
import { Box, Container, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useAppTheme } from "../hooks/useAppTheme";
import { sendContactForm } from "../api/contact";

export default function ContactSection() {
    const { colors } = useAppTheme();
    const { bg, border, textColor, taglineColor, inputBg } = colors;
    const toast = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";
        if (!message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await sendContactForm({ name, email, message });
            toast({
                title: "Message sent.",
                description: "Thank you for reaching out. I’ll get back to you soon.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            id="contact"
            py={{ base: 12, md: 16 }}
            bg={bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container maxW="600px" w={{ base: "90%", md: "80%" }} px={{ base: 4, md: 8 }} py={16}>
                <VStack as="form" spacing={6} w="100%" onSubmit={handleSubmit}>
                    <Heading as="h2" size="xl" color={textColor} mb={4}>
                        Let's Work Together
                    </Heading>

                    <FormControl isInvalid={!!errors.name} id="name">
                        <FormLabel color={taglineColor}>Name</FormLabel>
                        <Input
                            placeholder="Your name"
                            bg={inputBg}
                            borderColor={border}
                            color={textColor}
                            _placeholder={{ color: taglineColor }}
                            _focus={{ borderColor: taglineColor }}
                            borderRadius="md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.email} id="email">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.message} id="message">
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {errors.message && <FormErrorMessage>{errors.message}</FormErrorMessage>}
                    </FormControl>

                    <Button
                        type="submit"
                        bg={border}
                        color="white"
                        _hover={{ bg: "white", color: border }}
                        size="lg"
                        w="100%"
                        isLoading={isSubmitting}
                        loadingText="Sending..."
                    >
                        Send Message
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
