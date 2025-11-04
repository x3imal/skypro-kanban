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

/**
 * Попап просмотра и редактирования задачи.
 * Позволяет изменять статус, описание и дату задачи.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Открыт ли попап.
 * @param {Object} props.card - Данные задачи.
 * @param {()=>void} props.onClose - Закрыть попап.
 * @param {(id:string|number)=>Promise<void>} [props.onDelete] - Удаление задачи.
 * @param {(id:string|number, data:Object)=>Promise<void>} [props.onUpdate] - Сохранение изменений.
 * @returns {JSX.Element|null}
 */
export default function PopBrowse({ open, card, onClose, onDelete, onUpdate }) {
    const categoryKey = (card?.topic || card?.category || "webdesign")
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "");

    const [isEdit, setIsEdit] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({ title: "", description: "" });

    const initial = useMemo(
        () => ({
            title: card?.title || "Название задачи",
            status: card?.status || "Без статуса",
            description: card?.description || "",
            date: card?.rawDate || card?.date || null,
        }),
        [card]
    );

    const [title, setTitle] = useState(initial.title);
    const [status, setStatus] = useState(initial.status);
    const [text, setText] = useState(initial.description);
    const [date, setDate] = useState(initial.date);

    const onEdit = () => setIsEdit(true);

    const onCancel = () => {
        setIsEdit(false);
        setErrors({ title: "", description: "" });
        setTitle(initial.title);
        setStatus(initial.status);
        setText(initial.description);
        setDate(initial.date);
    };

    const onSave = async () => {
        if (!onUpdate) {
            setIsEdit(false);
            return;
        }

        const cleanTitle = title.trim();
        const cleanDesc = text.trim();

        const nextErrors = {
            title: cleanTitle ? "" : true,
            description: cleanDesc ? "" : true,
        };
        setErrors(nextErrors);

        if (nextErrors.title || nextErrors.description) {
            return;
        }

        setSaving(true);
        try {
            await onUpdate(card.id, {
                title: cleanTitle,
                status,
                description: cleanDesc,
                date,
            });
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
                    {!isEdit ? (
                        <Ttl>{title}</Ttl>
                    ) : (
                        <Area
                            as="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название задачи"
                            $isEdit
                            style={{
                                height: "36px",
                                resize: "none",
                                borderColor: errors.title ? "#F85149" : undefined,
                            }}
                        />
                    )}
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
                                                type="button"
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
                                style={errors.description ? { borderColor: "#F85149" } : undefined}
                            />
                            {errors.description && (
                                <div style={{ marginTop: 4, fontSize: 12, color: "#F85149" }}>
                                    {errors.description}
                                </div>
                            )}
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
                                <BtnPrimary onClick={onSave} disabled={saving}>
                                    Сохранить
                                </BtnPrimary>
                                <BtnOutlined onClick={onCancel} disabled={saving}>
                                    Отменить
                                </BtnOutlined>
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
