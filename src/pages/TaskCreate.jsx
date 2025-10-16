import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { kanbanApi } from "../services/kanban";

export default function TaskCreate() {
    const { token } = useAuth();
    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await kanbanApi.create({ title, topic, status, description }, token);
            nav("/");
        } catch (e) {
            setError(e.message || "Ошибка при создании задачи");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Создание задачи</h1>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Тема"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <input
                    placeholder="Статус"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Создаём..." : "Создать задачу"}
                </button>
                {error && <p style={{ color: "#E24545" }}>{error}</p>}
            </form>
        </div>
    );
}