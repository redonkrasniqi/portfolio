import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box
            minH="100vh"
            w="100%"
            overflowX="hidden"
            display="flex"
            flexDirection="column"
        >
            <Navbar />
            <Box flex="1">
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
