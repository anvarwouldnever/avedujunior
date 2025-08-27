import api from "../../api";

export const ChangeUser = (oldPassword: string, newPassword: string) => {
    return api.post(`/user`, {
        _method: "PUT",
        old_password: oldPassword, 
        new_password: newPassword
    });
};