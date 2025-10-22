export function normalizeKey(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\s|-/g, "");
}
