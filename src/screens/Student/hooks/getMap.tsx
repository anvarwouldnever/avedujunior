import React, { useEffect, useState } from 'react'
import { GetMap } from '../../../api/methods/students/map';

export const getMap = (type: string) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [map, setMap] = useState<any>()

    useEffect(() => {
        const fetchmap = async () => {
            try {
                const response = await GetMap(type);
                setMap(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки табеля');
            } finally {
                setLoading(false);
            }
        };
    
        fetchmap();
    }, []);

    return { map, loading, error };
}