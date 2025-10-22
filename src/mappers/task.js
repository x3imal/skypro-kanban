import { normalizeStatus } from "../utils/status";
import { formatDate } from "../utils/date";

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
