/**
 * Нормализует строку ключа: приводит к нижнему регистру и убирает пробелы/дефисы.
 * @param {string} value - Исходное значение.
 * @returns {string} Нормализованный ключ.
 */
export function normalizeKey(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\s|-/g, "");
}
