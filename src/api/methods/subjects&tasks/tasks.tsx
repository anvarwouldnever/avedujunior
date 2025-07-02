import api from "../../api";

export const GetTasks = (id: number) => {
    return api.get(`/subjects/${id}/tasks2?type=all`);
};

export const GetTask = (id: number) => {
    return api.get(`/days/${id}`);
};