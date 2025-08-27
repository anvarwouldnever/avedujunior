import { useEffect, useState } from 'react'
import { GetAccount } from '../../../api/methods/profile/account';
import { store } from '../../../store/store';

let cachedAccount: any = null;

export const clearAccountCache = () => {
    cachedAccount = null;
};

export const getAccount = () => {
    const [loading, setLoading] = useState(!cachedAccount);
    const [error, setError] = useState<string | null>(null);
    const [account, setAccount] = useState<any>(cachedAccount);

    useEffect(() => {
        if (cachedAccount) return; 

        const fetchAccount = async () => {
            try {
                const response = await GetAccount();
                cachedAccount = response?.data?.data;
                setAccount(cachedAccount);
                store.setJuridical(cachedAccount?.is_juridical)
                store.setAccess(cachedAccount?.access_level)
                if (!cachedAccount?.is_juridical) {
                    store.setName(cachedAccount?.first_name)
                    store.setGroup(cachedAccount?.group_name)
                } else {
                    store.setGroup(cachedAccount?.name)
                }
            } catch (e: any) {
                console.log(e);
                setError(e?.response?.data?.message || 'Ошибка загрузки аккаунта');
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, []);

    return { account, loading, error };
};
