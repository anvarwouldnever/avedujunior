import { useState } from 'react';
import { SendSMS } from '../../../api/methods/auth/auth';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const sendSMS = () => {
    const [loadingSend, setLoading] = useState(false);
    const [errorSend, setError] = useState<string | null>(null);

    const send = async (phone: string) => {
        setLoading(true);
        setError(null);
        
        try {

            const network = await checkNetwork()
            if (!network) { alertHandler("LoginScreen"); return; }

            let digits = phone.replace(/\D/g, '');

            if (!digits.startsWith('998')) {
                digits = '998' + digits;
            }

            if (digits.length < 12) {
                throw new Error('Некорректный номер телефона');
            }

            const formatted = `+${digits}`;
        
            await SendSMS(formatted);
        } catch (e: any) {
            console.log(e)
            setError(e?.response?.data?.message || 'Ошибка отправки смс');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { send, loadingSend, errorSend };
};


export default sendSMS