import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { authApi } from "../services/auth.js";

export const useAuth = () => useContext(AuthCtx);
const AuthCtx = createContext(null);

const LS_KEY = "kanban_auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved?.token) {
                    setUser(saved.user ?? null);
                    setToken(saved.token);
                }
            }
        } catch {}
    }, []);

    useEffect(() => {
        try {
            if (token) {
                localStorage.setItem(LS_KEY, JSON.stringify({ user, token }));
            } else {
                localStorage.removeItem(LS_KEY);
            }
        } catch {}
    }, [user, token]);

    const login = useCallback(async (loginStr, password) => {
        setLoading(true); setError(null);
        try {
            const { user } = await authApi.login({ login: loginStr, password });
            setUser(user);
            setToken(user.token);
            return user;
        } catch (e) {
            setError(e.message || "Ошибка авторизации");
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async ({ login, name, password }) => {
        setLoading(true); setError(null);
        try {
            const { user } = await authApi.register({ login, name, password });
            setUser(user);
            setToken(user.token);
            return user;
        } catch (e) {
            setError(e.message || "Ошибка регистрации");
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null); setToken(null); setError(null);
        try { localStorage.removeItem(LS_KEY); } catch {}
    }, []);

    const withAuth = useCallback(async (fn) => {
        try {
            return await fn();
        } catch (e) {
            if (e && e.status === 401) {
                logout();
            }
            throw e;
        }
    }, [logout]);

    const value = useMemo(() => ({
        user, token, isAuth: !!token,
        loading, error,
        login, register, logout, withAuth,
        listUsers: () => authApi.listUsers(token),
    }), [user, token, loading, error, login, register, logout, withAuth]);

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
