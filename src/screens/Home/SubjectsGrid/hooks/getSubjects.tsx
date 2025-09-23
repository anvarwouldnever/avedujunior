import { useEffect, useState } from 'react'
import { GetSubjects } from '../../../../api/methods/subjects&tasks/subjects';
import { homeScreenStore } from '../../HomeScreenStore';
import { checkNetwork } from '../../../../network/checkNetwork';

export const getSubjects = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
          try {
            const network = await checkNetwork()
            if (!network) return; 
            
            if (homeScreenStore.subjects.length > 0) return
            const response = await GetSubjects();
            homeScreenStore.setSubjects(response?.data?.data)
          } catch (e) {
            console.log(e)
            setError(e?.response?.data?.message || 'Ошибка загрузки предметов');
          } finally {
            setLoading(false);
          }
        };
    
        fetchSubjects();
    }, []);

    return { subjects: homeScreenStore.subjects, loading, error };
}