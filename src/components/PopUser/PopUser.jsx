import { Wrapper, Name, Mail, ThemeRow, ExitBtn } from "./PopUser.styled.js";
import {useAuth} from "../../context/AuthContext.jsx";

export default function PopUser({ isOpen, onClose, onAskLogout }) {

    const {user} = useAuth();

    if (!isOpen) return null;

    return (
        <Wrapper>
            <Name>
                {user?.name || "Имя пользователя"}
            </Name>
            <Mail>ivan.ivanov@gmail.com</Mail>

            <ThemeRow>
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
            </ThemeRow>

            <ExitBtn
                type="button"
                onClick={() => {
                    onClose?.();
                    onAskLogout?.();
                }}
            >
                Выйти
            </ExitBtn>
        </Wrapper>
    );
}
