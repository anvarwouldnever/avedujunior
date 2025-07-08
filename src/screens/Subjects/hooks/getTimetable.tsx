import React, { useEffect, useState } from 'react'
import { GetTimetable } from '../../../api/methods/timetable/timetable';

export const getTimetable = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timetable, setTimetable] = useState<Array<{ date: string, subjects: any[] }>>([])

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await GetTimetable();
                const raw = response?.data?.data;

                const normalized = Object.values(raw || {}) as Array<{ date: string, subjects: any[] }>;

                setTimetable(normalized);
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки расписания');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, []);

    return { timetable, loading, error };
}
