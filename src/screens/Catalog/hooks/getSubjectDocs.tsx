import React, { useEffect, useState } from 'react'
import { GetSubjectsDocs } from '../../../api/methods/subjects&tasks/subjects';

export const getSubjectDocs = (id: number) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subjectDocs, setSubjectDocs] = useState<any>()

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await GetSubjectsDocs(id);
                setSubjectDocs(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки доков предмета');
            } finally {
                setLoading(false);
            }
        };
    
        fetchDocs();
    }, [id]);

    return { subjectDocs, loading, error };
}