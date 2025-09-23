import React, { useEffect, useState, useCallback } from 'react'
import { GetGames } from '../../../api/methods/game/games';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const useGames = (id) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [games, setGames] = useState<Array<object>>([])

    useEffect(() => {
        const fetchPreGame = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }

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

    const markGameAsPassed = useCallback((gameId: number) => {
        let nextUnpassedIndex = -1;
    
        setGames(prev => {
            const updated = prev.map((game, i) => {
                if (game?.id === gameId) {
                    return { ...game, passed: 1 };
                }
                return game;
            });
    
            nextUnpassedIndex = updated.findIndex(g => g?.passed !== 1);
            return updated;
        });
    
        return nextUnpassedIndex;
    }, []);

    return { games, loading, error, markGameAsPassed };
}