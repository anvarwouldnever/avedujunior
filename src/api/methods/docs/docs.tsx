import api from "../../api";

export const GetDocs = () => {
    return api.get(`/docs`);
};