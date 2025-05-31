import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import config from "./config";
import styles from "./styles";
import colors from "./colors";

const theme = extendTheme({
    config,
    styles,
    colors: {
        ...baseTheme.colors,
        ...colors,
    },
    fonts: {
        ...baseTheme.fonts,
        heading: "'Poppins', sans-serif",
        body: "'Open Sans', sans-serif",
    },
});

export default theme;