/**
 * Короткие названия дней недели (начиная с понедельника).
 * @type {string[]}
 */
export const WEEKDAYS_SHORT = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

/**
 * Русские названия месяцев.
 * @type {string[]}
 */
export const MONTHS_RU = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

/** @type {boolean} Календарь начинается с понедельника. */
export const STARTS_ON_MONDAY = true;

/**
 * Преобразует дату в ISO-строку `YYYY-MM-DD`.
 * @param {Date|null} d
 * @returns {string|null}
 */
export const toISODate = (d) => {
    if (!d) return null;
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
};

/**
 * Форматирует дату в виде `DD.MM.YY`.
 * @param {Date|null} d
 * @returns {string}
 */
export const formatRu = (d) => {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth()+1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
};

/**
 * Преобразует значение (строку или объект) в `Date`.
 * Поддерживает ISO и формат `DD.MM.YY`.
 * @param {string|Date|null} value
 * @returns {Date|null}
 */
export const parseAnyDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const iso = new Date(value);
    if (!Number.isNaN(iso.getTime())) return iso;
    const m = String(value).match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
    if (m) {
        const [_, dd, mm, yy] = m;
        const year = 2000 + Number(yy);
        return new Date(year, Number(mm)-1, Number(dd));
    }
    return null;
};
