import React, { useEffect, useState } from 'react'
import { GetAvatars } from '../../../api/methods/profile/avatars';

export const getAvatars = () => {

    const [avatarsLoading, setAvatarsLoading] = useState(true);
    const [avatarsError, setAvatarsError] = useState(null);
    const [avatars, setAvatars] = useState<Array<any>>([])

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
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