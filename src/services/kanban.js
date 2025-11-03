import { http } from "./http";

/**
 * API для управления задачами (канбан).
 * Выполняет CRUD-запросы к `/kanban`.
 *
 * @namespace kanbanApi
 * @property {Function} list - Получить все задачи пользователя.
 * @property {Function} getById - Получить задачу по ID.
 * @property {Function} create - Создать новую задачу.
 * @property {Function} update - Обновить задачу.
 * @property {Function} remove - Удалить задачу.
 */
export const kanbanApi = {
    list: (token) => http.get("/kanban", { token }),
    getById: (id, token) => http.get(`/kanban/${id}`, { token }),
    create: (task, token) => http.post("/kanban", task, { token }),
    update: (id, task, token) => http.put(`/kanban/${id}`, task, { token }),
    remove: (id, token) => http.del(`/kanban/${id}`, { token }),
};