/**
 * Преобразует статус из API или текста в человеко-читаемый формат.
 * @param {string} s - Исходный статус.
 * @returns {string} Локализованное название.
 */
export function normalizeStatus(s) {
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

/**
 * Конвертирует локализованный статус в формат API.
 * @param {string} s - Статус пользователя или локальный текст.
 * @returns {string} API-ключ статуса.
 */
export function statusToApi(s) {
    const v = String(s || "").trim();
    const map = {
        "Без статуса": "none",
        "Нужно сделать": "todo",
        "В работе": "inProgress",
        "Тестирование": "testing",
        "Готово": "done",
        none: "none",
        todo: "todo",
        inProgress: "inProgress",
        testing: "testing",
        done: "done",
    };
    return map[v] || "none";
}
