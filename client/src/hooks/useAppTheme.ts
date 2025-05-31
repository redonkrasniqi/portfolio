import { useColorModeValue } from "@chakra-ui/react";
import theme from "../theme";

export function useAppTheme() {
    const brand = theme.colors.brand as Record<string, string>;

    const colors = {
        // Page background: brand["50"] in light, brand["900"] in dark
        bg: useColorModeValue(brand["50"], brand["900"]),

        // “Hi, my name is” accent: brand["600"] in light, brand["200"] in dark
        introColor: useColorModeValue(brand["600"], brand["200"]),

        // Primary text: brand["800"] in light, brand["50"] in dark
        textColor: useColorModeValue(brand["1000"], brand["50"]),

        // Tagline color: brand["700"] in light, brand["300"] in dark
        taglineColor: useColorModeValue(brand["700"], brand["300"]),

        // Paragraph text: brand["700"] in light, brand["300"] in dark
        paragraphColor: useColorModeValue(brand["700"], brand["300"]),

        // Button background: brand["500"] in light, brand["300"] in dark
        btnBg: useColorModeValue(brand["500"], brand["300"]),

        // Button hover: brand["600"] in light, brand["400"] in dark
        btnHoverBg: useColorModeValue(brand["600"], brand["400"]),

        // Button text color: brand["50"] in light, brand["900"] in dark
        btnColor: useColorModeValue(brand["50"], brand["900"]),

        // Toggle‐mode button background: brand["100"] in light, brand["700"] in dark
        modeBg: useColorModeValue(brand["100"], brand["700"]),

        // Toggle‐mode hover: brand["200"] in light, brand["600"] in dark
        modeHoverBg: useColorModeValue(brand["200"], brand["600"]),

        // Divider lines: brand["300"] in light, brand["600"] in dark
        divider: useColorModeValue(brand["300"], brand["600"]),

        // Borders (e.g. cards): brand["700"] in light, brand["200"] in dark
        border: useColorModeValue(brand["700"], brand["200"]),
    };

    return {
        theme,
        colors,
    };
}
