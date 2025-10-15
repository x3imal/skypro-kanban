import {useAuth} from "../auth/AuthContext.jsx";
import {useNavigate, useLocation, Link, Navigate} from "react-router-dom";
import {useState} from "react";

export default function Login() {
    const {login, isAuth} = useAuth();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return <Navigate to={from} replace/>;

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div style={{maxWidth: 360, margin: "60px auto"}}>
            <h1>Вход</h1>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                       style={{display: "block", width: "100%", margin: "10px 0"}}/>
                <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)}
                       style={{display: "block", width: "100%", margin: "10px 0"}}/>
                <button type="submit">Войти</button>
            </form>
            <p style={{marginTop: 10}}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
    );
}
