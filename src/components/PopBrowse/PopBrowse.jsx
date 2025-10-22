import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay, Box, Content, Top, Ttl, CatBadge,
    Wrap, Form, Field, Label, StatusPill, Area,
    Footer, Btn, BtnDanger, BtnPrimary, CalendarCol,
} from "./PopBrowse.styled";
import {parseAnyDate} from "../../constants/calendar.js";

export default function PopBrowse({ open, card, onClose, onEdit, onDelete }) {
    if (!open || !card) return null;

    const categoryKey = (card.topic || card.category || "gray")
        .toLowerCase()
        .replace(/\s+/g, "");

    return (
        <Overlay open={open} onClick={onClose}>
            <Box onClick={(e) => e.stopPropagation()}>
                <Content>
                    <Top>
                        <Ttl>{card.title || "Название задачи"}</Ttl>
                        <CatBadge $category={categoryKey}>
                            <p>{card.topic || card.category || "Web Design"}</p>
                        </CatBadge>
                    </Top>

                    <Wrap>
                        <Form id="formBrowseCard" action="#">
                            <Field>
                                <Label>Статус</Label>
                                <StatusPill>{card.status || "Нужно сделать"}</StatusPill>
                            </Field>

                            <Field>
                                <Label>Описание задачи</Label>
                                <Area
                                    readOnly
                                    id="textArea01"
                                    placeholder="Описание задачи"
                                    value={card.description || ""}
                                />
                            </Field>
                        </Form>

                        <CalendarCol>
                            <Calendar
                                value={parseAnyDate(card.rawDate || card.date)}
                                showHint={false}
                                readOnly
                            />
                        </CalendarCol>
                    </Wrap>

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
