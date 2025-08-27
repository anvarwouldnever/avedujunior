import { useEffect, useState } from 'react'
import { GetLabels } from '../../../api/methods/game/labels';
import { store } from '../../../store/store';

const cachedLabels: Record<string, any[]> = {};

export const getLabels = () => {
    
    const [loading, setLoading] = useState(!cachedLabels[store.language]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const lang = store?.language;

        if (cachedLabels[lang]) return;

        const fetchLabels = async () => {
            try {
                const response = await GetLabels();
                cachedLabels[lang] = response?.data || [];
                store.setLabels(response?.data)
            } catch (e: any) {
                console.log(e);
                setError(e?.response?.data?.message || 'Ошибка загрузки лейблов');
            } finally {
                setLoading(false);
            }
        };

        fetchLabels();
    }, [store.language]); 

    return { loading, error };
};
