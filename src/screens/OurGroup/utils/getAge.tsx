
export const getAge = (birthDateString: string): string => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (isNaN(age) || age < 0) return '';

    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    let suffix = 'лет';
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) suffix = 'лет';
    else if (lastDigit === 1) suffix = 'год';
    else if (lastDigit >= 2 && lastDigit <= 4) suffix = 'года';

    return `${age} ${suffix}`;
};

