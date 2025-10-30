import { Wrapper, Name, Mail, ThemeRow, ExitBtn } from "./PopUser.styled.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useThemeMode } from "../../context/ThemeModeContext.jsx";

export default function PopUser({ isOpen, onClose, onAskLogout }) {
    const { user } = useAuth();
    const { isDark, toggle } = useThemeMode();

    if (!isOpen) return null;

    return (
        <Wrapper>
            <Name>{user?.name || "Имя пользователя"}</Name>
            <Mail>ivan.ivanov@gmail.com</Mail>

            <ThemeRow>
                <p>Тёмная тема</p>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isDark}
                    onChange={toggle}
                />
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