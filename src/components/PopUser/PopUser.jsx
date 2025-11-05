import {Wrapper, Name, ThemeRow, ExitBtn, LoginStyled} from "./PopUser.styled.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {useThemeMode} from "../../context/ThemeModeContext.jsx";
import {useEffect, useRef} from "react";

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
export default function PopUser({isOpen, onClose, onAskLogout}) {
    const {user} = useAuth();
    const {isDark, toggle} = useThemeMode();
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <Wrapper ref={ref}>
            <Name>{user?.name || "Имя пользователя"}</Name>
            <LoginStyled>{user?.login || "Логин "}</LoginStyled>

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