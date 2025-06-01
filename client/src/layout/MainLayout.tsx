import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppTheme } from "../hooks/useAppTheme";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { colors } = useAppTheme();
    const { fullBg } = colors;

    return (
        <Box
            minH="100vh"
            w="100%"
            bg={fullBg}
            overflowX="hidden"
            display="flex"
            flexDirection="column"
        >
            <Box position="fixed" top="0" left="0" w="100%" zIndex="1000">
                <Navbar />
            </Box>

            <Box as="main" pt="64px" flex="1">
                {children}
            </Box>

            <Footer />
        </Box>
    );
}
