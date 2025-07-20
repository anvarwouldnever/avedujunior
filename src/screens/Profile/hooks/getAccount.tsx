import { useEffect, useState } from 'react'
import { GetAccount } from '../../../api/methods/profile/account';


export const getAccount = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState<any>()

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await GetAccount()
                setAccount(response?.data?.data)
            } catch (e) {
                console.log(e)
                setError(e?.response?.data?.message || 'Ошибка загрузки аккаунта');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAccount();
    }, []);

    return { account, loading, error };
}