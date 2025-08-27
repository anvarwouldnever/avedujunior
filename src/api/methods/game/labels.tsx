import api from "../../api";

export const GetLabels = () => {
    return api.get(`/labels`, {
        params: {
            type: 'student'
        }
    });
};