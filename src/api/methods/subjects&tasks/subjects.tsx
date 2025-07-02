import api from "../../api";

export const GetSubjects = () => {
    return api.get('/subjects?month_count=true');
};

export const GetSubjectsDocs = () => {
    return api.get('/subjects/5/docs');
};