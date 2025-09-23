import { useState } from 'react';
import { ChangePassword } from '../../../api/methods/profile/user';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const putPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const changePassword = async (oldPassword: string, newPassword: string, newPassword2: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            if (!newPassword || !newPassword2) {
                setError('Введите новый пароль');
                return;
            }
            
            if (newPassword !== newPassword2) {
                setError('Пароли должны совпадать');
                return;
            }

            const network = await checkNetwork()
            if (!network) { alertHandler(); return; }

            const response = await ChangePassword(oldPassword, newPassword);
            console.log(response?.data)
            
            if (response?.data?.data?.access_level) {
                setSuccess(true);
            }
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Ошибка смены пароля');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const resetSuccess = () => setSuccess(false);

    return { changePassword, loading, error, success, resetSuccess };
};
