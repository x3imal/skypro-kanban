import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTasks } from "../hooks/useTasks.js";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
    const { token } = useAuth();
    const value = useTasks(token);
    const memo = useMemo(() => value, [value]);
    return <TaskContext.Provider value={memo}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTaskContext must be used within <TaskProvider>");
    return ctx;
}
