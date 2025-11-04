import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTasks } from "../hooks/useTasks.js";

/**
 * Контекст задач.
 * Обеспечивает доступ к CRUD-операциям и данным задач из `useTasks`.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
    const { token } = useAuth();
    const value = useTasks(token);
    const memo = useMemo(() => value, [value]);
    return <TaskContext.Provider value={memo}>{children}</TaskContext.Provider>;
}

/**
 * Хук доступа к контексту задач.
 * @throws {Error} если используется вне `<TaskProvider>`.
 * @returns {ReturnType<typeof useTasks>}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTaskContext() {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTaskContext must be used within <TaskProvider>");
    return ctx;
}
