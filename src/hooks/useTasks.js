import { useCallback, useEffect, useRef, useState } from "react";
import { kanbanApi } from "../services/kanban";
import { mapTask } from "../mappers/task.js";
import { normalizeStatus, statusToApi } from "../utils/status.js";
import { formatDate, toISODateOnly } from "../utils/date.js";
import { DEFAULT_STATUSES } from "../constants/statuses.js";

const FIRST_STATUS = (DEFAULT_STATUSES && DEFAULT_STATUSES[0]) || "Без статуса";
const ALLOWED_TOPICS = ["Web Design", "Research", "Copywriting"];


/**
 * Хук для управления задачами (CRUD + загрузка).
 * Работает с API и хранит локальный список карточек.
 *
 * @param {string|null} token - Токен авторизации.
 * @returns {{
 *   cards: Array<Object>,
 *   loading: boolean,
 *   error: string,
 *   byId: (id:string|number)=>Object|null,
 *   create: (data:Object)=>Promise<Object>,
 *   remove: (id:string|number)=>Promise<boolean>,
 *   update: (id:string|number, patch:Object)=>Promise<Object|null>,
 *   reload: ()=>Promise<Array<Object>>
 * }}
 */
export function useTasks(token) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const cardsRef = useRef(cards);
    useEffect(() => {
        cardsRef.current = cards;
    }, [cards]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!token) {
                setCards([]);
                return;
            }
            setLoading(true);
            setError("");
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
        return () => {
            cancelled = true;
        };
    }, [token]);

    const reload = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const { tasks } = await kanbanApi.list(token);
            const mapped = (tasks || []).map(mapTask).filter(Boolean);
            setCards(mapped);
            return mapped;
        } catch (e) {
            const msg = e?.message || "Не удалось обновить список задач";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const create = useCallback(
        async ({ title, description, topic, due }) => {
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

            setCards((prev) => [...prev, optimistic]);

            try {
                const data = await kanbanApi.create(body, token);

                let apiTask;
                if (Array.isArray(data?.tasks) && data.tasks.length) {
                    apiTask =
                        data.tasks.find(
                            (t) =>
                                String(t.title || "") === body.title &&
                                String(t.topic || "") === safeTopic &&
                                (onlyDate ? toISODateOnly(t.date) === onlyDate : true)
                        ) || data.tasks[data.tasks.length - 1];
                } else {
                    apiTask = data?.task || data || {};
                }

                if (apiTask && apiTask.id && !apiTask._id) {
                    apiTask = { ...apiTask, _id: apiTask.id };
                }

                const created = mapTask({
                    title: body.title,
                    description: body.description,
                    topic: safeTopic,
                    date: onlyDate || null,
                    ...apiTask,
                });

                setCards((prev) => prev.map((c) => (c.id === tmpId ? created : c)));
                return created;
            } catch (e) {
                setCards((prev) => prev.filter((c) => c.id !== tmpId));
                const msg = e?.message || "Не удалось создать задачу";
                throw new Error(msg);
            }
        },
        [token]
    );

    const remove = useCallback(
        async (id) => {
            if (!id) return false;
            const prev = cardsRef.current;
            setCards((s) => s.filter((c) => c.id !== id));
            try {
                await kanbanApi.remove(id, token);
                return true;
            } catch (e) {
                setCards(prev);
                const msg = e?.message || "Не удалось удалить задачу";
                throw new Error(msg);
            }
        },
        [token]
    );

    const update = useCallback(
        async (id, patch) => {
            const prev = cardsRef.current;
            const idx = prev.findIndex((c) => c.id === id);
            if (idx === -1) return null;

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

            setCards((s) => {
                const copy = [...s];
                const i = copy.findIndex((c) => c.id === id);
                if (i !== -1) copy[i] = updatedLocal;
                return copy;
            });

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
                return merged;
            } catch (e) {
                setCards(prev);
                throw e;
            }
        },
        [token]
    );

    const byId = useCallback((id) => cardsRef.current.find((c) => c.id === id) || null, []);

    return { cards, loading, error, byId, create, remove, update, reload };
}
