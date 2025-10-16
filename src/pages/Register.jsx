import styled from "styled-components";
import { useAuth } from "../auth/AuthContext.jsx";
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

export default function Register() {
    const { register, isAuth, loading, error } = useAuth();
    const loc = useLocation();
    const to = loc.state?.from?.pathname || "/";

    const [name, setName] = useState("");
    const [loginStr, setLoginStr] = useState(""); // логин (у них это может быть email)
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={to} replace />;

    async function onSubmit(e){
        e.preventDefault();
        await register({ login: loginStr, name, password });
    }

    return (
        <Page>
            <Box onSubmit={onSubmit}>
                <h1>Регистрация</h1>

                <input
                    placeholder="Имя"
                    type="text"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    autoComplete="name"
                />
                <input
                    placeholder="Эл. почта (логин)"
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
                    autoComplete="new-password"
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Создаём..." : "Зарегистрироваться"}
                </button>

                {error && <div className="error">{error}</div>}

                <p className="muted">
                    Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                </p>
            </Box>
        </Page>
    );
}