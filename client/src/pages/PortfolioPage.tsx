import { VStack, Text } from "@chakra-ui/react";
// import HeroSection from "features/portfolio/components/HeroSection";
// import SkillsSection from "features/portfolio/components/SkillsSection";
// import ProjectsSection from "features/portfolio/components/ProjectsSection";
// import ContactSection from "features/portfolio/components/ContactSection";

/**
 * PortfolioPage assembles all portfolio sections in a vertical stack.
 */
export default function PortfolioPage() {
    return (
        <VStack spacing={16} px={{ base: 4, md: 16 }} align="stretch">
            <Text>Portfolio</Text>
            {/* <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection /> */}
        </VStack>
    );
}
