import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "../styles/theme.js";

const LS_KEY = "kanban_theme";
const ThemeModeCtx = createContext({ mode: "light", isDark: false, toggle: () => {} });

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            if (saved === "dark" || saved === "light") return saved;
            if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
                return "dark";
            }
        } catch {}
        return "light";
    });

    useEffect(() => {
        try { localStorage.setItem(LS_KEY, mode); } catch {}
    }, [mode]);

    useEffect(() => {
        const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!mql?.addEventListener) return;
        const onChange = (e) => setMode(prev => (localStorage.getItem(LS_KEY) ? prev : (e.matches ? "dark" : "light")));
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === LS_KEY && (e.newValue === "dark" || e.newValue === "light")) setMode(e.newValue);
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const toggle = useCallback(() => setMode(m => (m === "light" ? "dark" : "light")), []);
    const value = useMemo(() => ({ mode, isDark: mode === "dark", toggle }), [mode, toggle]);

    const activeTheme = useMemo(() => ({ ...themes[mode], name: mode }), [mode]);

    return (
        <ThemeModeCtx.Provider value={value}>
            <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
        </ThemeModeCtx.Provider>
    );
}

export const useThemeMode = () => useContext(ThemeModeCtx);
