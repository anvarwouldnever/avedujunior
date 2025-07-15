import React, { useEffect, useState } from 'react'
import { GetTimetable } from '../../../api/methods/timetable/timetable';

export const getTimetable = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timetable, setTimetable] = useState<Array<{ date: string, subjects: any[] }>>([])
    const [hasFifthWeek, setHasFifthWeek] = useState<boolean>(false)

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const today = new Date();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                const formattedDate = `${month}.${year}`;   
                
                const response = await GetTimetable(formattedDate);
                const raw = response?.data?.data;

                const normalized = Object.values(raw || {}) as Array<{ date: string, subjects: any[] }>;

                setTimetable(normalized);
                setHasFifthWeek(response?.data?.has_fifth_week)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки расписания');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, []);

    return { timetable, hasFifthWeek, loading, error };
}
