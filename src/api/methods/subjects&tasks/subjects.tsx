import api from "../../api";

export const GetSubjects = () => {
    return api.get('/subjects?month_count=true');
};

export const GetSubjectsDocs = (id: number) => {
    return api.get(`/subjects/${id}/docs`);
};