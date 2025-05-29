import { extendTheme } from "@chakra-ui/react";
import config from "./config";
import styles from "./styles";
import colors from "./colors";

const theme = extendTheme({
	config,
	styles,
	colors,
	fonts: {
		heading: "'Poppins', sans-serif",
		body: "'Open Sans', sans-serif",
	},
});

export default theme;
