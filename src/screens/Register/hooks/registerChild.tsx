import { useState } from 'react';
import { RegisterChild } from '../../../api/methods/auth/auth';
import { alertHandler } from '../../../network/alertHandler';
import { checkNetwork } from '../../../network/checkNetwork';

export const registerChild = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (name: string, lastName: string, fathersName: string, password: string, password2: string, homeAddress: string, birthdate: string, parentWho: string, parentName: string, parentSurname: string, parentFathersName: string, address, phone: string, code: string) => {
        setLoading(true);
        setError(null);
        
        try {

            const network = await checkNetwork()
            if (!network) { alertHandler("LoginScreen"); return; }

            let digits = phone.replace(/\D/g, '');
            const formatted = `+${digits}`;

            console.log(name, lastName, fathersName, password, password2, homeAddress, birthdate, parentWho, parentName, parentSurname, parentFathersName, address, formatted, code)
        
            const response = await RegisterChild(name, lastName, fathersName, password, password2, homeAddress, birthdate, parentWho, parentName, parentSurname, parentFathersName, address, formatted, code);
            return response.data
        } catch (e: any) {
            console.log(e?.response?.data?.message)
            setError(e?.response?.data?.message || 'Ошибка проверки смс');
            throw e?.response?.data?.message;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};


export default registerChild