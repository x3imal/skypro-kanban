import { http } from "./http";


export const kanbanApi = {
    list: (token) => http.get("/kanban", { token }),
    getById: (id, token) => http.get(`/kanban/${id}`, { token }),
    create: (task, token) => http.post("/kanban", task, { token }),
    update: (id, task, token) => http.put(`/kanban/${id}`, task, { token }),
    remove: (id, token) => http.del(`/kanban/${id}`, { token }),
};