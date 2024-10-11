'use client'

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface CustomThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    themes?: string[];
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean; 
}

export const ThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
