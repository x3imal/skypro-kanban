const BASE_URL = "https://wedev-api.sky.pro/api";

/**
 * Универсальная функция для выполнения HTTP-запросов.
 * Добавляет базовый URL, заголовки и обработку ошибок.
 *
 * @param {string} path - Путь запроса (без BASE_URL).
 * @param {Object} [options]
 * @param {"GET"|"POST"|"PUT"|"DELETE"} [options.method="GET"] - HTTP-метод.
 * @param {Object} [options.body] - Тело запроса (для POST/PUT).
 * @param {string} [options.token] - Токен авторизации.
 * @returns {Promise<Object>} Ответ API.
 * @throws {Error} Если запрос завершился с ошибкой.
 */
async function request(path, { method = "GET", body, token } = {}) {
    const headers = {
        "Content-Type": "" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    let data = null;
    try {
        data = await res.json();
    } catch {

        data = null;
    }

    if (!res.ok) {
        const msg = data?.error || data?.message || `${res.status} ${res.statusText}`;
        const err = new Error(msg);
        err.status = res.status;
        err.payload = data;
        throw err;
    }
    return data ?? {};
}

/**
 * Утилита для работы с API.
 * Предоставляет методы HTTP-запросов (get, post, put, del).
 *
 * @namespace http
 * @property {Function} get
 * @property {Function} post
 * @property {Function} put
 * @property {Function} del
 */
export const http = {
    get: (path, opts = {}) => request(path, { ...opts, method: "GET" }),
    post: (path, body, opts = {}) =>
        request(path, { ...opts, method: "POST", body }),
    put: (path, body, opts = {}) =>
        request(path, { ...opts, method: "PUT", body }),
    del: (path, opts = {}) => request(path, { ...opts, method: "DELETE" }),
};