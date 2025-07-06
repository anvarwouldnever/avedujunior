import React, { useEffect, useState } from 'react'
import { GetActivities } from '../../../api/methods/activities/activities';

const activitiesCache: Record<string, any> = {};

export const getActivities = (id) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);

            if (activitiesCache[id]) {
                setActivities(activitiesCache[id]);
                setLoading(false);
                return;
            }

            try {
                console.log('запрос')
                const response = await GetActivities(id);
                const data = response?.data?.data;

                activitiesCache[id] = data;
                setActivities(data);
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки активностей');
            } finally {
                setLoading(false);
            }
        };
    
        if (id) fetchActivities();
    }, [id]);

    return { activities, loading, error };
}