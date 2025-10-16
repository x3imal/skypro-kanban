import { http } from "./http";

export const kanbanApi = {
    list: (token) => http.get("/kanban", { token }), // → { tasks: [...] }

    getById: (id, token) => http.get(`/kanban/${id}`, { token }), // → { task: {...} }

    create: (task, token) => http.post("/kanban", task, { token }), // → { tasks:[...] }

    update: (id, task, token) => http.put(`/kanban/${id}`, task, { token }), // → { tasks:[...] }

    remove: (id, token) => http.del(`/kanban/${id}`, { token }), // → { tasks:[...] }
};