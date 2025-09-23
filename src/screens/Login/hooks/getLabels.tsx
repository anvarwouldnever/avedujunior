import { useEffect, useState } from 'react';
import { GetLabels } from '../../../api/methods/game/labels';
import { store } from '../../../store/store';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

const cachedLabels: Record<string, any[]> = {};

export const getLabels = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const lang = store.language;

        if (cachedLabels[lang]) {
            store.setLabels(cachedLabels[lang]);
            setLoading(false);
            return;
        }

        const fetchLabels = async () => {
            setLoading(true);
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                            
                const response = await GetLabels();
                cachedLabels[lang] = response?.data || [];
                store.setLabels(response?.data);
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
