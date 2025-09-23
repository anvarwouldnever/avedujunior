import React, { useEffect, useState } from 'react'
import { GetAvatars } from '../../../api/methods/profile/avatars';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const getAvatars = () => {

    const [avatarsLoading, setAvatarsLoading] = useState(true);
    const [avatarsError, setAvatarsError] = useState(null);
    const [avatars, setAvatars] = useState<Array<any>>([])

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                const response = await GetAvatars();
                setAvatars(response?.data?.data)
            } catch (e) {
                console.log(e)
                setAvatarsError(e?.response?.data?.message || 'Ошибка загрузки аватаров');
            } finally {
                setAvatarsLoading(false);
            }
        };
    
        fetchAvatars();
    }, []);

    return { avatars, avatarsLoading, avatarsError };
}