const BASE_URL = "https://wedev-api.sky.pro/api";

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
    try { data = await res.json(); } catch { data = null; }

    if (!res.ok) {
        const msg =
            data?.error || data?.message || `${res.status} ${res.statusText}`;
        const err = new Error(msg);
        err.status = res.status;
        err.payload = data;
        throw err;
    }
    return data ?? {};
}

export const http = {
    get: (path, opts = {}) => request(path, { ...opts, method: "GET" }),
    post: (path, body, opts = {}) =>
        request(path, { ...opts, method: "POST", body }),
    put: (path, body, opts = {}) =>
        request(path, { ...opts, method: "PUT", body }),
    del: (path, opts = {}) => request(path, { ...opts, method: "DELETE" }),
};