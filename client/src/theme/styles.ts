import type { StyleFunctionProps } from "@chakra-ui/react";

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            bg: props.colorMode === "light" ? "gray.50" : "gray.900",
            color: props.colorMode === "light" ? "gray.800" : "gray.100",
        },
        "html": {
            scrollPaddingTop: "64px",
        }
    }),
};

export default styles;
