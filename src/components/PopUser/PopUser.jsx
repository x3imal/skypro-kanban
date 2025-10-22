import { Wrapper, Name, Mail, ThemeRow, ExitBtn } from "./PopUser.styled.js";

export default function PopUser({ isOpen, onClose, onAskLogout }) {
    if (!isOpen) return null;

    return (
        <Wrapper>
            <Name>Ivan Ivanov</Name>
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
