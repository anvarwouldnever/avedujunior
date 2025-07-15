import api from "../../api";

export const GetTimetable = (date: string) => {
    return api.get(`/days/date2`, { params: { date } });
};