import { useState } from 'react';
import { CheckSMS } from '../../../api/methods/auth/auth';

export const checkSMS = () => {
    const [loadingCheck, setLoading] = useState(false);
    const [errorCheck, setError] = useState<string | null>(null);

    const check = async (phone: string, code: string) => {
        setLoading(true);
        setError(null);
        
        try {

            let digits = phone.replace(/\D/g, '');
            const formatted = `+${digits}`;
        
            const response = await CheckSMS(formatted, code);
            console.log(response.data)
            return response.data
        } catch (e: any) {
            console.log(e?.response?.data?.message)
            setError(e?.response?.data?.message || 'Ошибка проверки смс');
            throw e?.response?.data?.message;
        } finally {
            setLoading(false);
        }
    };

    return { check, loadingCheck, errorCheck };
};


export default checkSMS