# Theme Configuration

This document outlines the Chakra UI theme setup for your application, including how to fix and extend the default theme so everything works as expected.

## 1. `config.ts`

Defines the color mode behavior:

```ts
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  // Start in light mode by default
  initialColorMode: "light",
  // Do not use system color mode preference
  useSystemColorMode: false,
};

export default config;
```

## 2. `styles.ts`

Global styles applied across the app:

```ts
import type { StyleFunctionProps } from "@chakra-ui/react";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      // Light/dark background and text colors will be driven by Chakra's theme
      bg: props.colorMode === "light" ? "gray.50" : "gray.900",
      color: props.colorMode === "light" ? "gray.800" : "gray.100",
    },
  }),
};

export default styles;
```

> **Fix:** Use `props.colorMode` to dynamically select background/text colors, rather than hardcoding.

## 3. `colors.ts`

Custom brand color palette:

```ts
const brandColors = {
  50: "#f0fff4",
  100: "#c6f6d5",
  200: "#9ae6b4",
  300: "#68d391",
  400: "#48bb78",
  500: "#38a169",
  600: "#2f855a",
  700: "#276749",
  800: "#22543d",
  900: "#1c4532",
};

export default { brand: brandColors };
```

## 4. `index.ts`

Extend the default Chakra theme by merging in your custom values. This ensures all base colors, fonts, and other tokens remain available.

```ts
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import config from "./config";
import styles from "./styles";
import colors from "./colors";

const theme = extendTheme({
  config,
  styles,
  // Merge default colors with your brand palette
  colors: {
    ...baseTheme.colors,
    ...colors,
  },
  // Extend default fonts
  fonts: {
    ...baseTheme.fonts,
    heading: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif",
  },
});

export default theme;
```

### Why these changes?

* **Merging `baseTheme.colors`** keeps all default color scales (e.g., `gray`, `red`, etc.) alongside your `brand` shades.
* **Spreading `baseTheme.fonts`** preserves font stacks for monospace or other variants.
* **Dynamic global styles** in `styles.ts` adapt to light/dark mode properly.

With this setup in `client/src/theme/index.ts`, you can import your `theme` into the Chakra provider and expect all tokens (colors, fonts, spacing, etc.) to work as documented in Chakra UI's own theming guide.
