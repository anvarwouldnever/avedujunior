import React, { useEffect, useState } from 'react'
import { GetMe } from '../../../api/methods/auth/me';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const getMe = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [me, setMe] = useState<any>()

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                
                const response = await GetMe();
                setMe(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки инфы о себе');
            } finally {
                setLoading(false);
            }
        };
    
        fetchMe();
    }, []);

    return { me, loading, error };
}