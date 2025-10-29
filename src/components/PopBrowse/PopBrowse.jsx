import { useMemo, useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import { DEFAULT_STATUSES } from "../../constants/statuses.js";

import {
    Area,
    Box,
    BtnOutlined,
    BtnPrimary,
    CalendarCol,
    CatBadge,
    Content,
    DescField,
    Footer,
    Form,
    Label,
    Overlay,
    StatusBtn,
    StatusField,
    StatusList,
    StatusPill,
    StatusRow,
    Top,
    Ttl,
} from "./PopBrowse.styled.js";

export default function PopBrowse({ open, card, onClose, onDelete, onUpdate }) {
    const categoryKey = (card?.topic || card?.category || "webdesign")
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "");

    const [isEdit, setIsEdit] = useState(false);
    const [saving, setSaving] = useState(false);

    const initial = useMemo(
        () => ({
            status: card?.status || "Без статуса",
            description: card?.description || "",
            date: card?.date || null,
        }),
        [card?.status, card?.description, card?.date]
    );

    const [status, setStatus] = useState(initial.status);
    const [text, setText] = useState(initial.description);
    const [date, setDate] = useState(initial.date);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => {
        setIsEdit(false);
        setStatus(initial.status);
        setText(initial.description);
        setDate(initial.date);
    };

    const onSave = async () => {
        if (!onUpdate) { setIsEdit(false); return; }
        setSaving(true);
        try {
            await onUpdate(card.id, { status, description: text, date });
            setIsEdit(false);
        } finally {
            setSaving(false);
        }
    };

    const onRemove = async () => {
        if (!onDelete) return;
        await onDelete(card.id);
    };

    return (
        <Overlay open={open}>
            <Box>
                <Top>
                    <Ttl>{card?.title || "Название задачи"}</Ttl>
                    <CatBadge $key={categoryKey}>{card?.topic || card?.category || "—"}</CatBadge>
                </Top>

                <Content>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <StatusField>
                            <Label>Статус</Label>
                            <StatusRow>
                                {!isEdit ? (
                                    <StatusPill>{status}</StatusPill>
                                ) : (
                                    <StatusList>
                                        {DEFAULT_STATUSES.map((s) => (
                                            <StatusBtn
                                                key={s}
                                                $active={s === status}
                                                onClick={() => setStatus(s)}
                                            >
                                                {s}
                                            </StatusBtn>
                                        ))}
                                    </StatusList>
                                )}
                            </StatusRow>
                        </StatusField>

                        <DescField>
                            <Label>Описание задачи</Label>
                            <Area
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Введите описание задачи..."
                                $isEdit={isEdit}
                                disabled={!isEdit}
                            />
                        </DescField>

                        <CalendarCol>
                            <Calendar value={date} onChange={setDate} readOnly={!isEdit} />
                        </CalendarCol>
                    </Form>
                </Content>

                <Footer>
                    <div style={{ display: "flex", gap: 12 }}>
                        {!isEdit ? (
                            <>
                                <BtnOutlined onClick={onEdit}>Редактировать задачу</BtnOutlined>
                                <BtnOutlined onClick={onRemove}>Удалить задачу</BtnOutlined>
                            </>
                        ) : (
                            <>
                                <BtnPrimary onClick={onSave} disabled={saving}>Сохранить</BtnPrimary>
                                <BtnOutlined onClick={onCancel} disabled={saving}>Отменить</BtnOutlined>
                                <BtnOutlined onClick={onRemove}>Удалить задачу</BtnOutlined>
                            </>
                        )}
                    </div>
                    <BtnPrimary onClick={onClose}>Закрыть</BtnPrimary>
                </Footer>
            </Box>
        </Overlay>
    );
}