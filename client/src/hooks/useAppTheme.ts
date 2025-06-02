import { useColorModeValue } from "@chakra-ui/react";
import theme from "../theme";

export function useAppTheme() {
    const brand = theme.colors.brand as Record<string, string>;

    const colors = {
        /* backgrounds */
        fullBg: useColorModeValue(brand["75"], brand["950"]),
        bg: useColorModeValue(brand["50"], brand["900"]),
        cardBg: useColorModeValue(brand["100"], brand["700"]),
        inputBg: useColorModeValue(brand["100"], brand["700"]),

        /* brand accents & text */
        introColor: useColorModeValue(brand["600"], brand["200"]),
        textColor: useColorModeValue(brand["900"], brand["50"]),
        taglineColor: useColorModeValue(brand["700"], brand["300"]),
        paragraphColor: useColorModeValue(brand["700"], brand["300"]),

        /* buttons / misc */
        btnBg: useColorModeValue(brand["500"], brand["300"]),
        btnHoverBg: useColorModeValue(brand["600"], brand["400"]),
        btnColor: useColorModeValue(brand["50"], brand["900"]),
        modeBg: useColorModeValue(brand["100"], brand["700"]),
        modeHoverBg: useColorModeValue(brand["200"], brand["600"]),
        divider: useColorModeValue(brand["300"], brand["600"]),
        border: useColorModeValue(brand["1500"], brand["1500"]),
    };

    return { theme, colors };
}
