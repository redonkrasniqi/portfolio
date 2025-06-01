import { Box, VStack } from "@chakra-ui/react";
import MainSection from "./MainSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

export default function PortfolioPage() {
    return (
        <Box w="100%" overflowX="hidden">
            <VStack spacing={16} align="stretch">
                <MainSection />
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
            </VStack>
        </Box>
    );
}
