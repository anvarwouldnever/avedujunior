import api from "../../api";

export const LoginGroup = (id: string, password: string) => {
    return api.post('/auth/login/front', { id, password });
};

export const LoginChild = (id: string, password: string) => {
    return api.post('/auth/login/child', { id, password });
};