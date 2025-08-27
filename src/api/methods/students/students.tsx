import api from "../../api";

export const GetStudents = () => {
    return api.get(`/students`);
};