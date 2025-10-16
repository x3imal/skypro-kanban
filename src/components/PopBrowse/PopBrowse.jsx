import { useEffect } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay, Box, Content, Top, Ttl, CatBadge,
    Wrap, Form, Field, Label, StatusPill, Area,
    Footer, Btn, BtnDanger, BtnPrimary, Mobile
} from "./PopBrowse.styled";

export default function PopBrowse({ open, card, onClose, onEdit, onDelete }) {
    useEffect(() => {
        if (!open) return;
        const h = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [open, onClose]);

    if (!open || !card) return null;

    const categoryKey = (card.topic || card.category || "gray").toLowerCase();

    return (
        <Overlay open={open} onClick={onClose}>
            <Box onClick={(e) => e.stopPropagation()}>
                <Content>
                    <Top>
                        <Ttl>{card.title || "Название задачи"}</Ttl>
                        <CatBadge $category={categoryKey} className="theme-top">
                            <p>{card.topic || card.category || "Web Design"}</p>
                        </CatBadge>
                    </Top>

                    <Mobile.Wrap>
                        <Mobile.Form as={Form} id="formBrowseCard" action="#">
                            <Field>
                                <Label>Статус</Label>
                                <StatusPill>{card.status || "Нужно сделать"}</StatusPill>
                            </Field>

                            <Field style={{ marginTop: 11 }}>
                                <Label>Описание задачи</Label>
                                <Area
                                    readOnly
                                    id="textArea01"
                                    placeholder="Описание задачи"
                                    value={card.description || ""}
                                />
                            </Field>
                        </Mobile.Form>

                        <div style={{ width: 182 }}>
                            <Calendar activeDay={9} showHint={false} />
                        </div>
                    </Mobile.Wrap>

                    <Footer>
                        <div className="btn-group">
                            <Btn onClick={() => onEdit?.(card.id)}>Редактировать задачу</Btn>
                            <BtnDanger onClick={() => onDelete?.(card.id)}>Удалить задачу</BtnDanger>
                        </div>
                        <BtnPrimary onClick={onClose}>Закрыть</BtnPrimary>
                    </Footer>
                </Content>
            </Box>
        </Overlay>
    );
}
