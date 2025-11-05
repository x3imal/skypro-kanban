import { normalizeStatus } from "../utils/status";
import { formatDate } from "../utils/date";

/**
 * Преобразует задачу из API в формат для приложения.
 * Добавляет fallback-значения и форматирует дату.
 *
 * @param {Object} apiTask - Объект задачи из API.
 * @returns {Object} Задача в нормализованном виде:
 * {
 *   id, title, topic, status,
 *   date, rawDate, description, userId
 * }
 */
export function mapTask(apiTask) {
    return {
        id: apiTask._id || apiTask.id,
        title: apiTask.title || "Название задачи",
        topic: apiTask.topic || "Research",
        status: normalizeStatus(apiTask.status),
        date: apiTask.date ? formatDate(apiTask.date) : "",
        rawDate: apiTask.date ?? null,
        description: apiTask.description || "",
        userId: apiTask.userId ?? null,
    };
}
