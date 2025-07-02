import React, { useEffect, useState } from 'react'
import { GetTasks } from '../../../api/methods/subjects&tasks/tasks';
import { homeScreenStore } from '../../Home/HomeScreenStore';

export const getTasks = (id) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await GetTasks(id);
            homeScreenStore.setTasks(response?.data?.data)
          } catch (e) {
            setError(e?.response?.data?.message || 'Ошибка загрузки тасков');
          } finally {
            setLoading(false);
          }
        };
    
        fetchTasks();
    }, []);

    return { tasks: homeScreenStore.tasks, loading, error };
}