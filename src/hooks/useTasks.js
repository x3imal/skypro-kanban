import { useCallback, useEffect, useState } from "react";
import { kanbanApi } from "../services/kanban";
import { mapTask } from "../mappers/task.js";
import { normalizeStatus, statusToApi } from "../utils/status.js";
import { formatDate, toISODateOnly } from "../utils/date.js";
import { DEFAULT_STATUSES } from "../constants/statuses.js";

const FIRST_STATUS = (DEFAULT_STATUSES && DEFAULT_STATUSES[0]) || "Без статуса";
const ALLOWED_TOPICS = ["Web Design", "Research", "Copywriting"];

export function useTasks(token, navigate) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // initial load
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const { tasks } = await kanbanApi.list(token);
                const mapped = (tasks || []).map(mapTask).filter(Boolean);
                if (!cancelled) setCards(mapped);
            } catch (e) {
                if (!cancelled) setError(e?.message || "Не удалось загрузить задачи");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [token]);

    const create = useCallback(async ({ title, description, topic, due }) => {
        const safeTopic = ALLOWED_TOPICS.includes(topic) ? topic : "Research";
        const onlyDate = toISODateOnly(due);
        const body = {
            title: String(title || "").trim(),
            description: String(description || "").trim(),
            topic: safeTopic,
            ...(onlyDate ? { date: onlyDate } : {}),
        };

        const tmpId = `tmp-${Date.now()}`;
        const optimistic = {
            id: tmpId,
            title: body.title || "Название задачи",
            topic: safeTopic,
            status: FIRST_STATUS,
            date: onlyDate ? formatDate(onlyDate) : "",
            rawDate: onlyDate || null,
            description: body.description || "",
            userId: null,
        };
        setCards((prev) => [optimistic, ...prev]);

        try {
            const data = await kanbanApi.create(body, token);
            const apiTask = data?.task || data;
            const created = mapTask(apiTask);

            setCards((prev) => prev.map((c) => (c.id === tmpId ? created : c)));
            navigate(`/task/${created.id}`, { replace: true });
        } catch (e) {
            setCards((prev) => prev.filter((c) => c.id !== tmpId));
            throw new Error(e?.message || "Не удалось создать задачу");
        }
    }, [navigate, token]);

    const remove = useCallback(async (id) => {
        if (!id) return;
        const prev = cards;
        setCards((s) => s.filter((c) => c.id !== id));
        try {
            await kanbanApi.remove(id, token);
            navigate("/", { replace: true });
        } catch (e) {
            setCards(prev);
            alert(e?.message || "Не удалось удалить задачу");
        }
    }, [cards, navigate, token]);

    const update = useCallback(async (id, patch) => {
        const prev = cards;
        const idx = prev.findIndex((c) => c.id === id);
        if (idx === -1) return;

        const body = {};
        if (patch.status != null) body.status = statusToApi(patch.status);
        if (patch.description != null) body.description = String(patch.description || "").trim();
        if (patch.date !== undefined) {
            const onlyDate = toISODateOnly(patch.date);
            body.date = onlyDate || null;
        }

        const updatedLocal = {
            ...prev[idx],
            ...(patch.status != null ? { status: normalizeStatus(patch.status) } : {}),
            ...(patch.description != null ? { description: body.description } : {}),
            ...(patch.date !== undefined
                ? { rawDate: body.date, date: body.date ? formatDate(body.date) : "" }
                : {}),
        };
        const optimistic = [...prev];
        optimistic[idx] = updatedLocal;
        setCards(optimistic);

        try {
            const data = await kanbanApi.update(id, body, token);
            const apiTask = data?.task || data || {};
            const merged = {
                ...updatedLocal,
                status: apiTask.status ? normalizeStatus(apiTask.status) : updatedLocal.status,
                rawDate: Object.prototype.hasOwnProperty.call(apiTask, "date")
                    ? apiTask.date
                    : updatedLocal.rawDate,
                date: Object.prototype.hasOwnProperty.call(apiTask, "date")
                    ? apiTask.date
                        ? formatDate(apiTask.date)
                        : ""
                    : updatedLocal.date,
                description: apiTask.description ?? updatedLocal.description,
            };
            setCards((s) => s.map((c) => (c.id === id ? merged : c)));
        } catch (e) {
            setCards(prev);
            throw e;
        }
    }, [cards, token]);

    const byId = (id) => cards.find((c) => c.id === id) || null;

    return { cards, loading, error, byId, create, remove, update };
}
