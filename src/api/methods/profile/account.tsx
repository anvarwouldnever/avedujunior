import api from "../../api";

export const GetAccount = () => {
    return api.get(`/auth/me`);
};