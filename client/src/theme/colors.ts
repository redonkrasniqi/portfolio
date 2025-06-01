// src/theme/colors.ts

/**
 * brandColors:
 *
 * • 50 – 500 will be very light‐gray shades (for light mode).
 * • 600 – 900 will be dark‐blue → purple shades (for dark mode).
 */
const brandColors = {
    // ----- LIGHT MODE: VERY LIGHT GRAYS -----
    50: "#f9fafb",  // almost white (≈3% black)
    75: "#F5F5F5", // light grey
    100: "#f3f4f6",  // ≈6% black
    200: "#e5e7eb",  // ≈11% black
    300: "#d1d5db",  // ≈17% black
    400: "#9ca3af",  // ≈38% black (usable for mid‐tone text/accents)
    500: "#6b7280",  // ≈58% black (darkest gray in light palette)

    // ----- DARK MODE: DARK BLUE → PURPLE -----
    600: "#0f172a",  // flagship navy‐charcoal (dark page background)
    700: "#1e293b",  // slightly lighter navy (cards or secondary bg)
    800: "#5b21b6",  // deep indigo/purple (headings or accent text)
    900: "#1a202c",  // rich purple  (secondary accent or mid‐tone text on dark)
    950: "#131A23",  // dark purple
    1000: "000000"   // black (text)
};

export default {
    brand: brandColors,
};
