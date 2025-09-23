import React, { useEffect, useState } from 'react'
import { GetStudents } from '../../../api/methods/students/students';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const getStudents = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState<any>()

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const network = await checkNetwork()
                if (!network) { alertHandler(); return; }
                
                const response = await GetStudents();
                setStudents(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки детей');
            } finally {
                setLoading(false);
            }
        };
    
        fetchStudents();
    }, []);

    return { students, loading, error };
}