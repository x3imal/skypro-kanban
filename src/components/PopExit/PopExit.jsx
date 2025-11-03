import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, Container, Block, Title, BtnRow } from "./PopExit.styled.js";

/**
 * Попап подтверждения выхода из аккаунта.
 * Отображает выбор: выйти или остаться.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Флаг открытия попапа.
 * @param {()=>void} props.onClose - Закрытие окна.
 * @param {()=>void} props.onConfirm - Подтверждение выхода.
 * @returns {JSX.Element|null}
 */
export default function PopExit({ open, onClose, onConfirm }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <Overlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <Block>
                    <Title>Выйти из аккаунта?</Title>
                    <BtnRow>
                        <button className="_btn-bg" type="button" onClick={() => onConfirm?.()}>
                            Да, выйти
                        </button>
                        <button type="button" onClick={onClose}>
                            Нет, остаться
                        </button>
                    </BtnRow>
                </Block>
            </Container>
        </Overlay>,
        document.body
    );
}
