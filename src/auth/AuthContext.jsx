import {createContext, useContext, useMemo, useState} from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (email/*, password*/) => {
        setUser({ email });
    };

    const logout = () => setUser(null);

    const value = useMemo(() => ({ user, login, logout, isAuth: !!user }), [user]);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
