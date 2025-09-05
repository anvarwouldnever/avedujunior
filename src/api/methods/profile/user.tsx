import api from "../../api";

export const ChangePassword = (oldPassword: string, newPassword: string) => {
    return api.post(`/user`, {
        _method: "PUT",
        old_password: oldPassword, 
        new_password: newPassword
    });
};

export const ChangeProfile = (avatarId: string, backgroundId: string) => {
    return api.post(`/user`, {
        _method: "PUT",
        avatar_id: avatarId, 
        background_id: backgroundId
    });
};