import api from "../../api";

export const LoginGroup = (id: string, password: string) => {
    return api.post('/auth/login/front', { id, password });
};

export const LoginChild = (id: string, password: string) => {
    return api.post('/auth/login/child', { id, password });
};

export const SendSMS = (phone: string) => {
    return api.post('/auth/sms/send', { phone: phone, type: 'register' });
};

export const CheckSMS = (phone: string, code: string) => {
    return api.post('/auth/sms/check', { phone: phone, type: 'register', code: code });
};

export const RegisterChild = (name: string, lastName: string, fathersName: string, password: string, password2: string, homeAddress: string, birthdate: string, parentWho: string, parentName: string, parentSurname: string, parentFathersName: string, address, phone: string, code: string) => {
    return api.post('/auth/register/student', {
            'student[first_name]': name,
            'student[last_name]': lastName,
            'student[middle_name]': fathersName,
            'student[password]': password,
            'student[password_confirmation]': password2,
            'student[address]': homeAddress,
            'student[birth_date]': birthdate,
            'parents[0][mom_dad]': parentWho,
            'parents[0][first_name]': parentName,
            'parents[0][last_name]': parentSurname,
            'parents[0][middle_name]': parentFathersName,
            'parents[0][address]': address,
            'parents[0][phone]': phone,
            'parents[0][phone_code]': code
        },
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
};