import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import PopBrowse from "../components/PopBrowse/PopBrowse.jsx";
import PopNewCard from "../components/PopNewCard/PopNewCard.jsx";

import { useAuth } from "../auth/AuthContext.jsx";
import { kanbanApi } from "../services/kanban";
import { DEFAULT_STATUSES } from "../constants/statuses.js";

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
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Попап: создание новой задачи
    const isCreate = pathname === "/task/new";

    // Попап: просмотр задачи по ID из URL
    const match = matchPath("/task/:id", pathname);
    const viewedId = match?.params?.id || null;

    // Закрытие модалок — возвращение назад
    const closeToRoot = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/", { replace: true });
    };

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
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

        return () => {
            cancelled = true;
        };
    }, [token]);

    // Раскидываем задачи по статусам
    useMemo(() => {
        const base = Object.fromEntries(DEFAULT_STATUSES.map((s) => [s, []]));
        for (const c of cards) base[c.status]?.push(c);
        return base;
    }, [cards]);

    // Получаем задачу по ID (если открыта модалка просмотра)
    const current = useMemo(
        () => cards.find((c) => c.id === viewedId) || null,
        [cards, viewedId]
    );

    return (
        <>
            <Header />

            <Main
                cards={cards}
                isLoading={loading}
                error={error}
                onOpenCard={(id) => navigate(`/task/${id}`)}
            />

            <PopBrowse
                open={!!viewedId}
                card={current}
                onClose={closeToRoot}
            />

            <PopNewCard
                open={isCreate}
                onClose={closeToRoot}
            />
        </>
    );
}
