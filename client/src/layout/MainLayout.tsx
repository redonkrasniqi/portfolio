import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
    children: ReactNode;
}

/**
 * MainLayout wraps all pages with a common header, footer, and page container.
 */
export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1">
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
