import { http } from "./http";

export const authApi = {
    listUsers: (token) => http.get("/user", { token }),

    register: ({ login, name, password }) =>
        http.post("/user", { login, name, password }),

    login: ({ login, password }) =>
        http.post("/user/login", { login, password }),
};