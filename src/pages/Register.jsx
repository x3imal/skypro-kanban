import {useAuth} from "../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Register() {
    const {login} = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        // имитация регистрации
        login(email, password);
        nav("/", {replace: true});
    };

    return (
        <div style={{maxWidth: 360, margin: "60px auto"}}>
            <h1>Регистрация</h1>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                       style={{display: "block", width: "100%", margin: "10px 0"}}/>
                <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)}
                       style={{display: "block", width: "100%", margin: "10px 0"}}/>
                <button type="submit">Создать аккаунт</button>
            </form>
        </div>
    );
}
