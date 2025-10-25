import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import {
    Overlay, Dialog, Content, Title, Wrap, Form, Subttl,
    FormBlock, Input, TextArea, Categories, CategoriesTitle,
    Themes, ThemePill, CreateButton,
} from "./PopNewCard.styled.js";

export default function PopNewCard({ open = false, onClose, onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("Web Design");
    const [due, setDue] = useState(null);

    const [errors, setErrors] = useState({ title: "", description: "" });
    const [apiError, setApiError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const titleRef = useRef(null);
    const descRef = useRef(null);

    const close = () => onClose?.();

    const validate = () => {
        const next = {
            title: title.trim() ? "" : "Укажите название",
            description: description.trim() ? "" : "Добавьте описание",
        };
        setErrors(next);
        if (next.title) titleRef.current?.focus();
        else if (next.description) descRef.current?.focus();
        return !next.title && !next.description;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        if (!validate() || submitting) return;
        setSubmitting(true);
        try {
            await onSubmit?.({ title, description, topic, due });
            close();
        } catch (err) {
            setApiError(err?.message || "Не удалось создать задачу");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (title && errors.title) setErrors((s) => ({ ...s, title: "" }));
    }, [errors.title, title]);
    useEffect(() => {
        if (description && errors.description) setErrors((s) => ({ ...s, description: "" }));
    }, [description, errors.description]);

    if (!open) return null;

    return (
        <Overlay onClick={close}>
            <Dialog onClick={(e) => e.stopPropagation()}>
                <Content>
                    <Title>Создание задачи</Title>

                    {apiError && (
                        <div style={{ margin: "0 0 12px", padding: "8px 10px", borderRadius: 8, background: "#2d1f1f", color: "#ff6b6b", fontSize: 13 }}>
                            {apiError}
                        </div>
                    )}

                    <Wrap>
                        <Form id="formNewCard" onSubmit={handleSubmit} noValidate>
                            <FormBlock>
                                <Subttl htmlFor="formTitle">Название задачи</Subttl>
                                <Input
                                    type="text"
                                    id="formTitle"
                                    placeholder="Введите название задачи..."
                                    autoFocus
                                    ref={titleRef}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    aria-invalid={!!errors.title}
                                    style={errors.title ? { borderColor: "#F85149" } : undefined}
                                />
                                {errors.title && (
                                    <div style={{ marginTop: 6, fontSize: 12, color: "#F85149" }}>
                                        {errors.title}
                                    </div>
                                )}
                            </FormBlock>

                            <FormBlock>
                                <Subttl htmlFor="textArea">Описание задачи</Subttl>
                                <TextArea
                                    id="textArea"
                                    placeholder="Введите описание задачи..."
                                    ref={descRef}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    aria-invalid={!!errors.description}
                                    style={errors.description ? { borderColor: "#F85149" } : undefined}
                                />
                                {errors.description && (
                                    <div style={{ marginTop: 6, fontSize: 12, color: "#F85149" }}>
                                        {errors.description}
                                    </div>
                                )}
                            </FormBlock>
                        </Form>

                        <Calendar value={due} onChange={setDue} showHint />
                    </Wrap>

                    <Categories>
                        <CategoriesTitle>Категория</CategoriesTitle>
                        <Themes>
                            <ThemePill
                                $variant="webdesign"
                                $active={topic === "Web Design"}
                                onClick={() => setTopic("Web Design")}
                            >
                                Web Design
                            </ThemePill>
                            <ThemePill
                                $variant="research"
                                $active={topic === "Research"}
                                onClick={() => setTopic("Research")}
                            >
                                Research
                            </ThemePill>
                            <ThemePill
                                $variant="copywriting"
                                $active={topic === "Copywriting"}
                                onClick={() => setTopic("Copywriting")}
                            >
                                Copywriting
                            </ThemePill>
                        </Themes>
                    </Categories>

                    <CreateButton id="btnCreate" form="formNewCard" type="submit" disabled={submitting}>
                        {submitting ? "Создаю..." : "Создать задачу"}
                    </CreateButton>
                </Content>
            </Dialog>
        </Overlay>
    );
}
