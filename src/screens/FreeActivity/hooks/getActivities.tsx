import { useEffect, useState } from 'react'
import { GetActivities } from '../../../api/methods/activities/activities';
import { store } from '../../../store/store';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

const activitiesCache: Record<string, any> = {};

export const getActivities = (id: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        const cacheKey = `${id}_${store.language}`;

        const fetchActivities = async () => {
            setLoading(true);

            if (activitiesCache[cacheKey]) {
                setActivities(activitiesCache[cacheKey]);
                setLoading(false);
                return;
            }

            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }

                const response = await GetActivities(id);
                const data = response?.data?.data;
                activitiesCache[cacheKey] = data;
                setActivities(data);
            } catch (e) {
                setError(e?.response?.data?.message || 'Ошибка загрузки активностей');
            } finally {
                setLoading(false);
            }
        };

        if (id && store.language) fetchActivities();
    }, [id]);

    return { activities, loading, error };
};