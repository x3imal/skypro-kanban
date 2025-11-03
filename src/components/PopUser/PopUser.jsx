import { Wrapper, Name, Mail, ThemeRow, ExitBtn } from "./PopUser.styled.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useThemeMode } from "../../context/ThemeModeContext.jsx";

/**
 * Попап пользователя.
 * Показывает имя, почту, переключатель темы и кнопку выхода.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Открыт ли попап.
 * @param {()=>void} props.onClose - Закрыть попап.
 * @param {()=>void} props.onAskLogout - Запрос на выход из аккаунта.
 * @returns {JSX.Element|null}
 */
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