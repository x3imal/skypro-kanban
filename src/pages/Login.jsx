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
    height: 329px;
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
        transition: color 0.2s ease;
    }

    .muted a:hover {
        color: ${({ theme }) => theme.colors.brand};
    }
`;

export default function Login() {
    const {login, isAuth} = useAuth();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={from} replace/>;

    return (
        <Page>
            <Box onSubmit={(e) => {
                e.preventDefault();
                login(email, password);
            }}>
                <h1>Вход</h1>

                <input
                    placeholder="Эл. почта"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Войти</button>

                <p className="muted">
                    Нужно зарегистрироваться? <Link to="/register">Регистрируйтесь здесь</Link>
                </p>
            </Box>
        </Page>
    );
}
