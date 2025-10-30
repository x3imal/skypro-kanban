import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "../styles/theme.js";

const LS_KEY = "kanban_theme";
const Ctx = createContext({ mode: "light", isDark: false, toggle: () => {} });

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved === "dark" || saved === "light") setMode(saved);
        else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) setMode("dark");
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_KEY, mode);
    }, [mode]);

    const toggle = useCallback(() => setMode(m => (m === "light" ? "dark" : "light")), []);
    const value = useMemo(() => ({ mode, isDark: mode === "dark", toggle }), [mode, toggle]);

    return (
        <Ctx.Provider value={value}>
            <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
        </Ctx.Provider>
    );
}

export const useThemeMode = () => useContext(Ctx);