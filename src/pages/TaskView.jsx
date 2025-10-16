import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { kanbanApi } from "../services/kanban";

export default function TaskView() {
    const { id } = useParams();
    const { token } = useAuth();
    const nav = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTask() {
            setLoading(true);
            setError(null);
            try {
                const { task } = await kanbanApi.getById(id, token);
                setTask(task);
            } catch (e) {
                setError(e.status === 404 ? "Задача не найдена" : e.message);
            } finally {
                setLoading(false);
            }
        }
        loadTask();
    }, [id, token]);

    async function onSave() {
        setSaving(true);
        try {
            await kanbanApi.update(id, task, token);
            nav("/");
        } catch (e) {
            setError(e.message || "Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    }

    async function onDelete() {
        if (!confirm("Удалить задачу?")) return;
        setSaving(true);
        try {
            await kanbanApi.remove(id, token);
            nav("/");
        } catch (e) {
            setError(e.message || "Ошибка при удалении");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p style={{ padding: 20 }}>Загрузка...</p>;
    if (error) return <p style={{ padding: 20, color: "#E24545" }}>{error}</p>;
    if (!task) return null;

    return (
        <div style={{ padding: 20 }}>
            <h1>Редактирование задачи</h1>
            <input
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <input
                value={task.topic}
                onChange={(e) => setTask({ ...task, topic: e.target.value })}
            />
            <input
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
            />
            <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            <button onClick={onSave} disabled={saving}>
                {saving ? "Сохраняем..." : "Сохранить"}
            </button>
            <button onClick={onDelete} disabled={saving}>
                {saving ? "Удаляем..." : "Удалить"}
            </button>

            {error && <p style={{ color: "#E24545" }}>{error}</p>}
        </div>
    );
}