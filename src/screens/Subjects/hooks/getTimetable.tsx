import React, { useEffect, useState } from 'react'
import { GetTimetable } from '../../../api/methods/timetable/timetable';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const getTimetable = (month: any, year: any) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timetable, setTimetable] = useState<Array<{ date: string, subjects: any[] }>>([])
    const [hasFifthWeek, setHasFifthWeek] = useState<boolean>(false)

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                
                const formattedMonth = (month + 1).toString().padStart(2, '0');
                const formattedDate = `${formattedMonth}.${year}`;
                
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
