import api from "../../api";

export const GetTimetable = () => {
    return api.get(`/timetable`);
};