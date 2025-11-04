import styled from "styled-components";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useState } from "react";

const Page = styled.div`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.bg};
`;

const Box = styled.form`
  width: 368px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 50px 60px;
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    margin: 0 0 10px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  input {
    height: 36px;
    padding: 0 12px;
    border-radius: 8px;
    border: 0.7px solid ${({ theme }) => theme.colors.inputBorder};
    background: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    font-size: 14px;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  button {
    height: 36px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.brand};
    color: #fff;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.6;
    cursor: default;
  }
  button:hover {
    background: ${({ theme }) => theme.colors.hoverBrand};
  }

  .muted {
    margin-top: 10px;
    text-align: center;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
  }
  .muted a {
    color: ${({ theme }) => theme.colors.muted};
    text-decoration: underline;
    transition: color 0.2s;
  }
  .muted a:hover {
    color: ${({ theme }) => theme.colors.brand};
  }

  .error {
    color: #e24545;
    text-align: center;
    margin-top: 4px;
    font-size: 14px;
  }
`;

/**
 * Страница входа пользователя.
 * Поддерживает ввод логина и пароля, обработку ошибок и редирект после входа.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Login() {
    const { login, isAuth, loading, error } = useAuth();
    const loc = useLocation();
    const rawFrom = loc.state?.from?.pathname;
    const from = rawFrom === "/exit" ? "/" : rawFrom || "/";

    const [loginStr, setLoginStr] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    if (isAuth) return <Navigate to={from} replace />;

    async function onSubmit(e) {
        e.preventDefault();

        const trimLogin = loginStr.trim();
        const trimPassword = password.trim();

        if (!trimLogin || !trimPassword) {
            setLocalError("Введите логин и пароль");
            return;
        }

        setLocalError("");
        try {
            await login(trimLogin, trimPassword);
        } catch (err) {}
    }

    return (
        <Page>
            <Box onSubmit={onSubmit}>
                <h1>Вход</h1>

                <input
                    placeholder="Эл. почта"
                    type="text"
                    value={loginStr}
                    onChange={(e) => setLoginStr(e.target.value)}
                    autoComplete="username"
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                </button>

                {(error || localError) && (
                    <div className="error">{localError || error}</div>
                )}


                <p className="muted">
                    Нужно зарегистрироваться? <Link to="/register">Регистрируйтесь здесь</Link>
                </p>
            </Box>
        </Page>
    );
}
