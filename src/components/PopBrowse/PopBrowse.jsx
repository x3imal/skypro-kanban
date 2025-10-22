import { useMemo, useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay, Box, Content, Top, Ttl, CatBadge,
    Wrap, Form, Field, Label, StatusPill, Area,
    Footer, Btn, BtnDanger, BtnPrimary, CalendarCol, StatusList, StatusBtn,
} from "./PopBrowse.styled";
import { DEFAULT_STATUSES } from "../../constants/statuses.js";
import { parseAnyDate } from "../../constants/calendar.js";

const PICK_COLOR = "#94A6BE";

export default function PopBrowse({ open, card, onClose, onDelete, onUpdate }) {

    const categoryKey = (card.topic || card.category || "gray")
        .toLowerCase()
        .replace(/\s+/g, "");

    const [isEdit, setIsEdit] = useState(false);

    const initial = useMemo(
        () => ({
            status: card.status || "Без статуса",
            description: card.description || "",
            date: parseAnyDate(card.rawDate || card.date) || null,
        }),
        [card]
    );

    const [status, setStatus] = useState(initial.status);
    const [description, setDescription] = useState(initial.description);
    const [date, setDate] = useState(initial.date);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const resetLocal = () => {
        setStatus(initial.status);
        setDescription(initial.description);
        setDate(initial.date);
        setError("");
    };

    if (!open || !card) return null;

    const handleSave = async () => {
        setError("");
        setSaving(true);
        try {
            await onUpdate?.(card.id, {
                status,
                description,
                date,
            });
            setIsEdit(false);
        } catch (e) {
            setError(e?.message || "Не удалось сохранить изменения");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        resetLocal();
        setIsEdit(false);
    };

    const statuses = DEFAULT_STATUSES;

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

                    {error && (
                        <div
                            style={{
                                margin: "0 0 12px",
                                padding: "8px 10px",
                                borderRadius: 8,
                                background: "#2d1f1f",
                                color: "#ff6b6b",
                                fontSize: 13,
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <Wrap>
                        <Form id="formBrowseCard" action="#" onSubmit={(e) => e.preventDefault()}>
                            <Field>
                                <Label>Статус</Label>

                                {!isEdit ? (
                                    <StatusPill>{card.status || "Нужно сделать"}</StatusPill>
                                ) : (
                                    <StatusList>
                                        {statuses.map((s) => (
                                            <StatusBtn
                                                key={s}
                                                type="button"
                                                $active={s === status}
                                                onClick={() => setStatus(s)}
                                            >
                                                {s}
                                            </StatusBtn>
                                        ))}
                                    </StatusList>

                                )}
                            </Field>

                            <Field>
                                <Label>Описание задачи</Label>
                                <Area
                                    id="textArea01"
                                    placeholder="Описание задачи"
                                    readOnly={!isEdit}
                                    value={isEdit ? description : (card.description || "")}
                                    onChange={isEdit ? (e) => setDescription(e.target.value) : undefined}
                                    style={isEdit ? { outline: `2px solid ${PICK_COLOR}` } : undefined}
                                />
                            </Field>
                        </Form>

                        <CalendarCol>
                            <Calendar
                                value={isEdit ? date : parseAnyDate(card.rawDate || card.date)}
                                onChange={isEdit ? setDate : undefined}
                                showHint={false}
                                readOnly={!isEdit}
                            />
                        </CalendarCol>
                    </Wrap>

                    <Footer>
                        <div className="btn-group">
                            {!isEdit ? (
                                <>
                                    <Btn onClick={() => setIsEdit(true)}>Редактировать задачу</Btn>
                                    <BtnDanger onClick={() => onDelete?.(card.id)}>Удалить задачу</BtnDanger>
                                </>
                            ) : (
                                <>
                                    <Btn onClick={handleCancel} disabled={saving}>Отменить</Btn>
                                    <BtnPrimary onClick={handleSave} disabled={saving}>
                                        {saving ? "Сохраняю..." : "Сохранить"}
                                    </BtnPrimary>
                                </>
                            )}
                        </div>
                        <BtnPrimary onClick={onClose}>Закрыть</BtnPrimary>
                    </Footer>
                </Content>
            </Box>
        </Overlay>
    );
}
