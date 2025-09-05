import api from "../../api";

export const GetMap = (type: string) => {
    return api.get(`/map-sections`, {
        params: {
            type: type
        }
    });
};