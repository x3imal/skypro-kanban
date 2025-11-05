import {createContext, useContext, useEffect, useMemo, useState, useCallback} from "react";
import {authApi} from "../services/auth.js";


/**
 * Контекст авторизации пользователя.
 * Сохраняет токен, данные пользователя и методы входа/регистрации.
 *
 * @returns {{user: (Object|null),
 * token: (string|null),
 * isAuth: boolean,
 * loading: boolean,
 * error: (string|null),
 * login: (function(string, string): Promise<Object>),
 * register: (function(Object): Promise<Object>),
 * logout: (function(): void),
 * withAuth: (function(Function): Promise<*>),
 * listUsers: (function(): Promise<Array>)}|null}
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthCtx);
const AuthCtx = createContext(null);

const LS_KEY = "kanban_auth";


/**
 * Провайдер контекста авторизации.
 * Инициализирует данные из localStorage и управляет состоянием пользователя.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function AuthProvider({children}) {
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
        } catch (err) {
            console.warn("Ошибка чтения auth из localStorage:", err);
        }
    }, []);

    useEffect(() => {
        try {
            if (token) {
                localStorage.setItem(LS_KEY, JSON.stringify({user, token}));
            } else {
                localStorage.removeItem(LS_KEY);
            }
        } catch (err) {
            console.warn("Ошибка очистки localStorage:", err);
        }
    }, [user, token]);

    const login = useCallback(async (loginStr, password) => {
        setLoading(true);
        setError(null);
        try {
            const {user} = await authApi.login({login: loginStr, password});
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

    const register = useCallback(async ({login, name, password}) => {
        setLoading(true);
        setError(null);
        try {
            const {user} = await authApi.register({login, name, password});
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
        setUser(null);
        setToken(null);
        setError(null);
        try {
            localStorage.removeItem(LS_KEY);
        } catch (err) {
            console.warn("Ошибка при очистке localStorage:", err);
        }
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
