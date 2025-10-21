import { createContext, useContext, useMemo, useState } from "react";
import {authApi} from "../services/auth.js";


//TODO проверить хуки
export const useAuth = () => useContext(AuthCtx);
const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login(loginStr, password) {
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
    }

    async function register({ login, name, password }) {
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
    }

    function logout() { setUser(null); setToken(null); setError(null); }

    const value = useMemo(() => ({
        user, token, isAuth: !!token,
        loading, error,
        login, register, logout,
        listUsers: () => authApi.listUsers(token),
    }), [user, token, loading, error]);

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}