import api from "../../api";

export const AnswerCorrect = (id: number) => {
    return api.put("/passed_tests", {passed: 1, test_ids: [id]});
};