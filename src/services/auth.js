import { http } from "./http.js";

/**
 * API для аутентификации и управления пользователями.
 * Оборачивает HTTP-запросы к backend-эндпоинтам `/user` и `/user/login`.
 *
 * @namespace authApi
 * @property {Function} listUsers - Получает список всех пользователей.
 * @property {Function} register - Регистрирует нового пользователя.
 * @property {Function} login - Выполняет вход по логину и паролю.
 */
export const authApi = {
    listUsers: (token) => http.get("/user", { token }),

    register: ({ login, name, password }) =>
        http.post("/user", { login, name, password }),

    login: ({ login, password }) =>
        http.post("/user/login", { login, password }),
};