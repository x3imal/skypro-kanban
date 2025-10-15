import styled from "styled-components";
import {useAuth} from "../auth/AuthContext.jsx";
import {useLocation, Link, Navigate} from "react-router-dom";
import {useState} from "react";

const Page = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.colors.bg};
`;

const Box = styled.form`
    width: 368px;
    background: #fff;
    border: 0.7px solid #D4DBE5;
    border-radius: 10px;
    padding: 50px 60px;
    box-shadow: ${({theme}) => theme.shadow.card};
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
        margin: 0 0 10px 0;
        text-align: center;
        font-size: 24px;
        line-height: 30px;
        font-weight: 700;
        letter-spacing: -0.4px;
    }

    input {
        width: 100%;
        height: 36px;
        padding: 0 12px;
        border-radius: 8px;
        border: 0.7px solid rgba(148, 166, 190, 0.4);
        outline: none;
        font-size: 14px;
    }

    input::placeholder {
        color: #94A6BE;
    }

    button {
        width: 100%;
        height: 36px;
        margin-top: 10px;
        border: none;
        border-radius: 4px;
        background: ${({theme}) => theme.colors.brand};
        color: #fff;
        font-weight: 500;
        cursor: pointer;
    }

    button:hover {
        background: ${({theme}) => theme.colors.hoverBrand};
    }

    .muted {
        margin-top: 10px;
        text-align: center;
        color: #94A6BE;
        font-size: 14px;
    }

    .muted a {
        color: #94A6BE;
        text-decoration: underline;
        transition: color .2s ease;
    }

    .muted a:hover {
        color: ${({theme}) => theme.colors.brand};
    }
`;

export default function Register() {
    const {login, isAuth} = useAuth();
    const loc = useLocation();
    const to = loc.state?.from?.pathname || "/";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={to} replace/>;

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <Page>
            <Box onSubmit={onSubmit}>
                <h1>Регистрация</h1>

                <input
                    placeholder="Имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                />
                <input
                    placeholder="Эл. почта"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />

                <button type="submit">Зарегистрироваться</button>

                <p className="muted">
                    Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                </p>
            </Box>
        </Page>
    );
}
