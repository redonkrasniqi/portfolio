import { Box, Container, Heading, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, ListItem, Icon, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { useAppTheme } from "../hooks/useAppTheme";
import { experiences } from "../types/experience";

export default function ExperienceSection() {
    const { colors } = useAppTheme();
    const { bg, textColor, taglineColor, divider } = colors;
    const [tabIndex, setTabIndex] = useState(0);

    const orientation = useBreakpointValue(
        { base: "horizontal", md: "vertical" } as const
    ) ?? "horizontal";

    const isVertical = orientation === "vertical";

    return (
        <Box id="experience" minH="100vh" w="100%" bg={bg}>
            <Container maxW="1200px" px={{ base: 4, md: 8 }} py={16}>
                <Heading
                    as="h2"
                    size="lg"
                    mb={10}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color={textColor}
                >
                    <Text as="span" fontWeight="bold" color={textColor}>
                        02.
                    </Text>
                    Where I’ve Worked
                    <Box
                        flex="1"
                        h="1px"
                        bg={taglineColor}
                        display={{ base: "none", md: "block" }}
                    />
                </Heading>

                <Tabs
                    index={tabIndex}
                    onChange={setTabIndex}
                    orientation={orientation}
                    variant="unstyled"
                    isFitted={isVertical}
                >
                    <Flex
                        direction={isVertical ? "row" : "column"}
                        gap={isVertical ? { base: 6, md: 10 } : 4}
                    >
                        <TabList
                            borderLeft={isVertical ? `1px solid ${divider}` : undefined}
                            borderBottom={!isVertical ? `1px solid ${divider}` : undefined}
                            overflowY={isVertical ? "auto" : undefined}
                            overflowX={!isVertical ? "auto" : undefined}
                            whiteSpace={!isVertical ? "nowrap" : undefined}
                            minW={isVertical ? { base: "140px", md: "180px" } : "100%"}
                            maxH={isVertical ? "70vh" : undefined}
                        >
                            {experiences.map((exp, idx) => (
                                <Tab
                                    key={`${exp.company}-${idx}`}
                                    _selected={{ color: textColor, bg: "transparent" }}
                                    px={isVertical ? 4 : 2}
                                    py={isVertical ? 2 : 1}
                                    minW={!isVertical ? "120px" : undefined}
                                    flex={!isVertical ? "0 0 auto" : undefined}
                                    justifyContent={isVertical ? "flex-start" : "center"}
                                >
                                    {exp.company}
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanels flex="1">
                            {experiences.map((exp) => (
                                <TabPanel key={`${exp.company}-panel`} px={0}>
                                    <Heading as="h3" size="md" color={textColor} mb={1}>
                                        {exp.role}{" "}
                                        {exp.companyUrl ? (
                                            <>
                                                @{" "}
                                                <Box
                                                    as="a"
                                                    href={exp.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    color={textColor}
                                                    _hover={{ textDecoration: "underline" }}
                                                >
                                                    {exp.company}
                                                </Box>
                                            </>
                                        ) : (
                                            <>@ {exp.company}</>
                                        )}
                                    </Heading>
                                    <Text fontSize="sm" color={taglineColor} mb={4}>
                                        {exp.period}
                                    </Text>

                                    <UnorderedList spacing={3} color={textColor}>
                                        {exp.bullets.map((b) => (
                                            <ListItem key={b}>{b}</ListItem>
                                        ))}
                                    </UnorderedList>

                                    {exp.tech && (
                                        <Flex gap={3} mt={6}>
                                            {exp.tech.map((IconComp, i) => (
                                                <Icon
                                                    key={i}
                                                    as={IconComp}
                                                    boxSize={6}
                                                    color={textColor}
                                                    title="Key tech"
                                                />
                                            ))}
                                        </Flex>
                                    )}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Flex>
                </Tabs>
            </Container>
        </Box>
    );
}
