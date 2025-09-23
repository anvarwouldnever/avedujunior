import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';
import { Ionicons } from '@expo/vector-icons';

const RegisterButton = ({ progress, setProgress, hasEmptyFieldsChild, password, password2, hasEmptyFieldsParent, register, loading, success }) => {

    const { s, vs, isTablet } = useScale()

    let isButtonDisabled = false;

    if (progress === 1) {
        isButtonDisabled = hasEmptyFieldsChild;
    } else if (progress === 2) {
        const arePasswordsSame = password === password2;
        const arePasswordsEmpty = !password || !password2;
        isButtonDisabled = !arePasswordsSame || arePasswordsEmpty;
    } else if (progress === 3) {
        isButtonDisabled = hasEmptyFieldsParent;
    }

    const handlePress = () => {
        if (isButtonDisabled) return;
        if (progress === 3) {
            register()
        } else {
            setProgress((prev) => Math.min(prev + 1, 3));
        }
    };

    // Приоритет store.labels
    const continueLabel = store.labels?.continue || translations[store.language]?.продолжить;
    const registerChildLabel = store.labels?.registerChild || translations[store.language]?.зарегистрироватьребенкавсистеме;

    return (
        <TouchableOpacity 
            onPress={() => handlePress()} 
            disabled={loading || success} 
            style={{ 
                width: '100%', 
                height: isTablet? vs(45) : s(45), 
                backgroundColor: success ? '#59E956' : '#6A5AE0', 
                opacity: isButtonDisabled ? 0.5 : 1, 
                borderRadius: 15, 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            { loading ?
                <ActivityIndicator size={'small'} color={'white'} />
            : success ?
                <Ionicons size={vs(30)} name='checkmark-circle-outline' color={'white'} />
            :
                <Text style={{ color: 'white', fontWeight: '600', fontSize: isTablet? vs(14) : s(14) }}>
                    {progress === 1 || progress === 2 ? continueLabel : progress === 3 && registerChildLabel}
                </Text>
            }
        </TouchableOpacity>
    )
};

export default RegisterButton
