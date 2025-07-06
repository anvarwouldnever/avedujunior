import api from "../../api";

export const GetAvatars = () => {
    return api.get(`/avatars`);
};