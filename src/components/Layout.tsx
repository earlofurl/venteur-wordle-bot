import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ReactNode } from "react";
import { baseThemeOptions } from "./theme";

const baseTheme = createTheme(baseThemeOptions);
const responsiveTheme = responsiveFontSizes(baseTheme);

interface Props {
    children?: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={responsiveTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Layout;
