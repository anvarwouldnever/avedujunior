import React, { useEffect, useState } from 'react'
import { GetBackgrounds } from '../../../api/methods/profile/backgrounds';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const getBackgrounds = () => {

    const [backgroundsLoading, setBackgroundsLoading] = useState(true);
    const [backgroundsError, setBackgroundsError] = useState(null);
    const [backgrounds, setBackgrounds] = useState<Array<object>>([])

    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
                const response = await GetBackgrounds()
                setBackgrounds(response?.data?.data)
            } catch (e) {
                console.log(e)
                setBackgroundsError(e?.response?.data?.message || 'Ошибка загрузки backgrounds');
            } finally {
                setBackgroundsLoading(false);
            }
        };
    
        fetchBackgrounds();
    }, []);

    return { backgrounds, backgroundsLoading, backgroundsError };
}