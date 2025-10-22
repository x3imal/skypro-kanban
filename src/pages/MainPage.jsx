import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import PopBrowse from "../components/PopBrowse/PopBrowse.jsx";
import PopNewCard from "../components/PopNewCard/PopNewCard.jsx";
import PopExit from "../components/PopExit/PopExit.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { kanbanApi } from "../services/kanban";
import { DEFAULT_STATUSES } from "../constants/statuses.js";

function normalizeStatus(s) {
    if (!s) return "Без статуса";
    const v = String(s).trim();
    const map = {
        none: "Без статуса",
        todo: "Нужно сделать",
        inProgress: "В работе",
        testing: "Тестирование",
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

function toISODateOnly(input) {
    if (!input) return undefined;
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return undefined;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isCreate = pathname === "/task/new";
    const isExit = pathname === "/exit";
    const match = matchPath("/task/:id", pathname);
    const viewedId = match?.params?.id || null;

    const closeToRoot = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/", { replace: true });
    };

    const handleConfirmExit = () => {
        logout();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
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

    const FIRST_STATUS = DEFAULT_STATUSES?.[0] || "Без статуса";

    const handleCreate = async ({ title, description, topic, due }) => {
        const allowed = ["Web Design", "Research", "Copywriting"];
        const safeTopic = allowed.includes(topic) ? topic : "Research";

        const onlyDate = toISODateOnly(due);
        const body = {
            title: title.trim(),
            description: description.trim(),
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
            description: body.description || "",
            userId: null,
        };
        setCards((prev) => [optimistic, ...prev]);

        try {
            const data = await kanbanApi.create(body, token);
            const apiTask = data?.task || data;

            const created = {
                id: apiTask._id,
                title: apiTask.title || optimistic.title,
                topic: apiTask.topic || optimistic.topic,
                status: normalizeStatus(apiTask.status) || FIRST_STATUS,
                date: apiTask.date ? formatDate(apiTask.date) : optimistic.date,
                description: apiTask.description || optimistic.description,
                userId: apiTask.userId ?? optimistic.userId,
            };

            setCards((prev) => prev.map((c) => (c.id === tmpId ? created : c)));

            navigate(`/task/${created.id}`, { replace: true });
        } catch (e) {
            setCards((prev) => prev.filter((c) => c.id !== tmpId));
            throw new Error(e?.message || "Не удалось создать задачу");
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;

        setCards((prev) => prev.filter((c) => c.id !== id));

        try {
            await kanbanApi.remove(id, token);
            navigate("/", { replace: true });
        } catch (e) {
            setCards((prev) => [...prev]);
            alert(e.message || "Не удалось удалить задачу");
        }
    };

    const current = useMemo(
        () => (viewedId ? cards.find((c) => c.id === viewedId) || null : null),
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
                statuses={DEFAULT_STATUSES}
            />

            {!!current && <PopBrowse open card={current} onClose={closeToRoot} onDelete={handleDelete} />}

            <PopNewCard open={isCreate} onClose={closeToRoot} onSubmit={handleCreate} />

            <PopExit open={isExit} onClose={closeToRoot} onConfirm={handleConfirmExit} />
        </>
    );
}
