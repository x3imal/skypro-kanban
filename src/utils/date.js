import {STARTS_ON_MONDAY} from "../constants/calendar.js";

/**
 * Строит массив из 42 дат (6 недель) для отображения месяца в виде сетки.
 * @param {number} viewYear - Год отображаемого месяца.
 * @param {number} viewMonth - Месяц (0–11) для отображения.
 * @returns {Date[]} Массив дат для календарной сетки.
 */
export function buildMonthGrid(viewYear, viewMonth) {
    const first = new Date(viewYear, viewMonth, 1);
    const firstIdx = first.getDay();
    const shift = STARTS_ON_MONDAY ? (firstIdx === 0 ? 6 : firstIdx - 1) : firstIdx;
    const start = new Date(viewYear, viewMonth, 1 - shift);

    return Array.from({ length: 42 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
}

/**
 * Форматирует дату ISO в вид `DD.MM.YY`.
 * @param {string} iso - ISO-дата.
 * @returns {string}
 */
export function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
}

/**
 * Преобразует объект `Date` или ISO-строку в `YYYY-MM-DD`.
 * @param {Date|string} input
 * @returns {string|undefined}
 */
export function toISODateOnly(input) {
    if (!input) return undefined;
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return undefined;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
