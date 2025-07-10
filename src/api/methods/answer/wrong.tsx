import api from "../../api";

export const AnswerWrong = (id: number) => {
    return api.post(`/tests/error/${id}`);
};