import api from "../../api";

export const GetMe = () => {
    return api.get('/auth/me');
};