import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import PopBrowse from "../components/PopBrowse/PopBrowse.jsx";
import PopNewCard from "../components/PopNewCard/PopNewCard.jsx";
import PopExit from "../components/PopExit/PopExit.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { DEFAULT_STATUSES } from "../constants/statuses.js";
import { useTasks } from "../hooks/useTasks.js";

export default function MainPage() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isCreate = pathname === "/task/new";
    const isExit = pathname === "/exit";
    const match = matchPath("/task/:id", pathname);
    const viewedId = match?.params?.id || null;
    const isTaskView = Boolean(viewedId && viewedId !== "new" && viewedId !== "undefined");

    const { cards, loading, error, byId, create, remove, update } = useTasks(token, navigate);

    useEffect(() => {
        if (!loading && isTaskView && !byId(viewedId)) {
            navigate("/", { replace: true });
        }
    }, [loading, isTaskView, viewedId, byId, navigate]);

    const current = useMemo(
        () => (isTaskView ? byId(viewedId) : null),
        [byId, isTaskView, viewedId]
    );

    const closeToRoot = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/", { replace: true });
    };

    const handleConfirmExit = () => {
        logout();
        navigate("/login", { replace: true });
    };

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

            {!!current && (
                <PopBrowse
                    open
                    card={current}
                    onClose={closeToRoot}
                    onDelete={remove}
                    onUpdate={update}
                />
            )}

            <PopNewCard open={isCreate} onClose={closeToRoot} onSubmit={create} />

            <PopExit open={isExit} onClose={closeToRoot} onConfirm={handleConfirmExit} />
        </>
    );
}
