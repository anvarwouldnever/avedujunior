import { useState } from 'react';
import { ChangeProfile } from '../../../api/methods/profile/user';

export const putProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changeProfile = async (avatarId: string, backgroundId: string) => {
        setLoading(true);
        setError(null);
        
        try {
            await ChangeProfile(avatarId, backgroundId);
        } catch (e: any) {
            console.log(e)
            setError(e?.response?.data?.message || 'Ошибка смены пароля');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { changeProfile, loading, error };
};
