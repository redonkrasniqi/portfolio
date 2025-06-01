import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { extraProjects } from "../types/projects";
import ExtraProjectCard from "../components/ExtraProjectCard";
import { useAppTheme } from "../hooks/useAppTheme";

export default function ExtraProjects() {
    const { colors } = useAppTheme();
    const { bg, textColor } = colors;

    return (
        <Box w="100%" bg={bg}>
            <Container maxW="1200px" px={{ base: 4, md: 8 }} py={20}>
                <Heading
                    size="md"
                    textAlign="center"
                    color={textColor}
                    mb={2}
                    fontWeight="semibold"
                >
                    Other Noteworthy Projects
                </Heading>

                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={8}
                >
                    {extraProjects.map((p) => (
                        <GridItem key={p.title}>
                            <ExtraProjectCard project={p} />
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
