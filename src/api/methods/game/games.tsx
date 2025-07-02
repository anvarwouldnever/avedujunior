import api from "../../api";

export const GetGames = (id: number) => {
    return api.get(`/tests/${id}`);
};
