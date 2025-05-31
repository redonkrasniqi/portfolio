import { VStack } from "@chakra-ui/react";
import MainSection from "./MainSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

/**
 * PortfolioPage assembles all portfolio sections in a vertical stack.
 */
export default function PortfolioPage() {
    return (
        <>
            <VStack spacing={16} px={{ base: 4, md: 16 }} align="stretch">
                <MainSection />
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
            </VStack>
        </>
    );
}
