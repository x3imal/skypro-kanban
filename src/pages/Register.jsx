import styled from "styled-components";
import { useAuth } from "../auth/AuthContext.jsx";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useState } from "react";

const Page = styled.div`
    min-height:100dvh;
    display:flex; align-items:center; justify-content:center;
    background: ${({theme}) => theme.colors.bg};
`;

const Box = styled.form`
    width:360px;
    background:#fff;
    border:0.7px solid #D4DBE5;
    border-radius:10px;
    padding:24px 20px;
    box-shadow:${({theme}) => theme.shadow.card};

    h1{ font-size:20px; margin-bottom:14px; }
    input{
        width:100%; height:36px; margin:8px 0; padding:0 10px;
        border:0.7px solid rgba(148,166,190,0.4); border-radius:8px; outline:none;
    }
    button{
        width:100%; height:36px; margin-top:10px;
        background:${({theme})=>theme.colors.brand}; color:#fff;
        border:none; border-radius:4px; cursor:pointer;
    }
    p{ margin-top:10px; }
`;

export default function Register() {
    const { login, isAuth } = useAuth();
    const loc = useLocation();
    const to = loc.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={to} replace />;

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <Page>
            <Box onSubmit={onSubmit}>
                <h1>Регистрация</h1>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button type="submit">Создать аккаунт</button>
                <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
            </Box>
        </Page>
    );
}
