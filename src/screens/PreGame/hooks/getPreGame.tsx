import React, { useEffect, useState } from 'react'
import { GetTask } from '../../../api/methods/subjects&tasks/tasks';

export const getPreGame = (id) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [preGame, setPreGame] = useState<any>()

    useEffect(() => {
        const fetchPreGame = async () => {
            try {
                const response = await GetTask(id);
                setPreGame(response?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки предметов');
            } finally {
                setLoading(false);
            }
        };
    
        fetchPreGame();
    }, [id]);

    return { preGame, loading, error };
}