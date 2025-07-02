import React, { useEffect, useState } from 'react'
import { GetGames } from '../../../api/methods/game/games';


export const getGames = (id) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [games, setGames] = useState<Array<object>>([])

    useEffect(() => {
        const fetchPreGame = async () => {
            try {
                console.log('fetching games')
                const response = await GetGames(id);
                setGames(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки предметов');
            } finally {
                setLoading(false);
            }
        };
    
        fetchPreGame();
    }, []);

    return { games, loading, error };
}