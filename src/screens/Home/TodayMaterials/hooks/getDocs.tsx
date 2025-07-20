import React, { useEffect, useState } from 'react'
import { GetDocs } from '../../../../api/methods/docs/docs';

export const getDocs = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [docs, setDocs] = useState<any>()

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await GetDocs();
                setDocs(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки доков');
            } finally {
                setLoading(false);
            }
        };
    
        fetchDocs();
    }, []);

    return { docs, loading, error };
}