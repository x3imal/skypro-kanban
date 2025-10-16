import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { kanbanApi } from "../services/kanban";
import {DEFAULT_STATUSES} from "../constants/statuses.js";

function normalizeStatus(s) {
    if (!s) return "Без статуса";
    const v = String(s).trim();
    const map = {
        noStatus: "Без статуса",
        "no-status": "Без статуса",
        no_status: "Без статуса",
        todo: "Нужно сделать",
        inProcess: "В работе",
        inprocess: "В работе",
        in_progress: "В работе",
        inProgress: "В работе",
        testing: "Тестирование",
        test: "Тестирование",
        done: "Готово",

        "Без статуса": "Без статуса",
        "Нужно сделать": "Нужно сделать",
        "В работе": "В работе",
        "Тестирование": "Тестирование",
        "Готово": "Готово",
    };
    return map[v] || "Без статуса";
}

function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
}

function mapTask(apiTask) {
    return {
        id: apiTask._id,
        title: apiTask.title || "Название задачи",
        topic: apiTask.topic || "Research",
        status: normalizeStatus(apiTask.status),
        date: formatDate(apiTask.date),
        description: apiTask.description || "",
        userId: apiTask.userId,
    };
}

export default function MainPage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true); setError(null);
            try {
                const { tasks } = await kanbanApi.list(token);
                const mapped = (tasks || []).map(mapTask);
                if (!cancelled) setCards(mapped);
            } catch (e) {
                if (!cancelled) setError(e.message || "Не удалось загрузить задачи");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [token]);


    const grouped = useMemo(() => {
        const base = Object.fromEntries(DEFAULT_STATUSES.map(s => [s, []]));
        for (const c of cards) base[c.status]?.push(c);
        return base;
    }, [cards]);


    return (
        <>
            <Header />
            <Main cards={cards} isLoading={loading} error={error} />
        </>
    );
}