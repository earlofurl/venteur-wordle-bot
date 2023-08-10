import { ThemeOptions } from "@mui/material/styles";

export const baseThemeOptions: ThemeOptions = {
    typography: {
        // Full Screen Hero Text
        h1: {
            fontSize: "2.625rem", // 42px
            lineHeight: 1.25,
            fontWeight: 500,
        },
        // Large Titles
        h2: {
            fontSize: "2rem", // 32px
            lineHeight: 1.25,
            fontWeight: 500,
        },
        // Page Titles
        h3: {
            fontSize: "1.75rem", // 28px
            lineHeight: 1.3,
            fontWeight: 500,
        },
        // Marketing E-mail Header
        h4: {
            fontSize: "1.5rem", // 24px
            lineHeight: 1.3,
            fontWeight: 500,
        },
        // Section Titles
        h5: {
            fontSize: "1.25rem", // 20px
            lineHeight: 1.4,
            fontWeight: 500,
        },
        // Small Headers
        h6: {
            fontSize: "1.125rem", // 18px
            lineHeight: 1.4,
            fontWeight: 500,
        },
        // Marketing body text
        body1: {
            fontSize: "1rem", // 16px
            lineHeight: 1.375,
            fontWeight: 400,
        },
        // Command Document body text
        body2: {
            fontSize: "0.875rem", // 14px
            lineHeight: 1.4,
            fontWeight: 400,
        },
        overline: {
            textTransform: "none",
            fontSize: "0.875rem",
            lineHeight: "1.8",
            fontWeight: 500,
            color: "#444",
        },
        button: {
            textTransform: "none",
        },
    },
};
