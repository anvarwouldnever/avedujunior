import api from "../../api";

export const GetActivities = (id: number) => {
    return api.get(`/material-categories/${id}/materials`);
};