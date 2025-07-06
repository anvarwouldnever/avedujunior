import api from "../../api";

export const GetBackgrounds = () => {
    return api.get(`/backgrounds`);
};