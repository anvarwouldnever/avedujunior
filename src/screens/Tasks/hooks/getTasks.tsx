import { useEffect, useState } from 'react'
import { GetTasks } from '../../../api/methods/subjects&tasks/tasks';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const useTasks = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState(undefined)

    useEffect(() => {
        if (!id) return;
        const fetchTasks = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                setLoading(true);
                const response = await GetTasks(id);
                setTasks(response?.data?.data);
            } catch (e) {
                setError(e?.response?.data?.message || 'Ошибка загрузки тасков');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [id]);

    return { tasks: tasks, loading, error };
};
