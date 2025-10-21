import styled from "styled-components";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useState } from "react";

const Page = styled.div`
    min-height: 100dvh;
    display: flex; align-items: center; justify-content: center;
    background: ${({ theme }) => theme.colors.bg};
`;

const Box = styled.form`
    width: 368px;
    background: #fff;
    border: 0.7px solid #D4DBE5;
    border-radius: 10px;
    padding: 50px 60px;
    box-shadow: ${({ theme }) => theme.shadow.card};
    display: flex; flex-direction: column; gap: 10px;

    h1{ margin: 0 0 10px; text-align: center; font-size: 24px; font-weight: 700; }

    input{
        height: 36px; padding: 0 12px; border-radius: 8px;
        border: 0.7px solid rgba(148,166,190,.4); outline: none; font-size: 14px;
    }
    input::placeholder{ color:#94A6BE; }

    button{
        height: 36px; margin-top: 10px; border: none; border-radius: 4px;
        background: ${({theme})=>theme.colors.brand}; color:#fff; cursor: pointer;
    }
    button:disabled{ opacity:.6; cursor: default; }
    button:hover{ background: ${({theme})=>theme.colors.hoverBrand}; }

    .muted{ margin-top:10px; text-align:center; color:#94A6BE; font-size:14px; }
    .muted a{ color:#94A6BE; text-decoration:none; transition:color .2s; }
    .muted a:hover{ color:${({theme})=>theme.colors.brand}; }

    .error{ color:#E24545; text-align:center; margin-top:4px; font-size:14px; }
`;

export default function Login() {
    const { login, isAuth, loading, error } = useAuth();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || "/";

    const [loginStr, setLoginStr] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={from} replace />;

    async function onSubmit(e){
        e.preventDefault();
        await login(loginStr, password);
    }

    return (
        <Page>
            <Box onSubmit={onSubmit}>
                <h1>Вход</h1>

                <input
                    placeholder="Эл. почта"
                    type="text"
                    value={loginStr}
                    onChange={e=>setLoginStr(e.target.value)}
                    autoComplete="username"
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    autoComplete="current-password"
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                </button>

                {error && <div className="error">{error}</div>}

                <p className="muted">
                    Нужно зарегистрироваться? <Link to="/register">Регистрируйтесь здесь</Link>
                </p>
            </Box>
        </Page>
    );
}