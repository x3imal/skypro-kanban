import { useMemo } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import PopBrowse from "../components/PopBrowse/PopBrowse.jsx";
import PopNewCard from "../components/PopNewCard/PopNewCard.jsx";
import PopExit from "../components/PopExit/PopExit.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { DEFAULT_STATUSES } from "../constants/statuses.js";
import { useTaskContext } from "../context/TasksContext.jsx";

export default function MainPage() {
    const { logout } = useAuth();
    const { cards, loading, error, byId, create, remove, update } = useTaskContext();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const viewMatch = matchPath("/task/:id", pathname);
    const isCreate = pathname === "/task/new";
    const isExit = pathname === "/exit";

    const currentId = viewMatch?.params?.id || null;
    const current = useMemo(() => (currentId ? byId(currentId) : null), [currentId, byId]);

    const openCard = (id) => navigate(`/task/${id}`);
    const closeToRoot = () => navigate("/", { replace: true });

    const handleCreate = async (values) => {
        const created = await create(values);
        if (created?.id) navigate(`/task/${created.id}`, { replace: true });
    };

    const handleDelete = async (id) => {
        const ok = await remove(id);
        if (ok) closeToRoot();
    };

    const handleConfirmExit = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <Header />

            <Main
                statuses={DEFAULT_STATUSES}
                cards={cards}
                loading={loading}
                error={error}
                onOpenCard={openCard}
            />

            {!!current && (
                <PopBrowse
                    open
                    card={current}
                    onClose={closeToRoot}
                    onDelete={handleDelete}
                    onUpdate={update}
                />
            )}

            <PopNewCard open={isCreate} onClose={closeToRoot} onSubmit={handleCreate} />

            <PopExit open={isExit} onClose={closeToRoot} onConfirm={handleConfirmExit} />
        </>
    );
}
