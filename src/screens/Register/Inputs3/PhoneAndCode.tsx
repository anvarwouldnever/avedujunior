import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Keyboard } from 'react-native'
import React from 'react'
import translations from '../../../../translations'
import { store } from '../../../store/store'
import { useScale } from '../../../hooks/useScale'
import MaskInput from 'react-native-mask-input';
import sendSMS from '../hooks/sendSMS'
import checkSMS from '../hooks/checkSMS'

const PhoneAndCode = ({ code, setCode, phone, setPhone, setErrorMessage, isCodeCorrect, setisCodeCorrect, errorMessage, setIsCodeSent, isCodeSent }) => {

    const { s, vs, isTablet } = useScale()

    const { send, loadingSend } = sendSMS()
    const { check, loadingCheck } = checkSMS()

    const digits = phone.replace(/\D/g, '')
    const isPhoneValid = digits.length === 12;

    const hadleSendSMS = async() => {
        try {
            await send(phone)
            setIsCodeSent(true)
        } catch (error) {
            setErrorMessage(error || 'Ошибка отправки смс')
        }
    }

    const handleCheckSMS = async() => {
        try {
            const response = await check(phone, code)

            Keyboard.dismiss();
            setisCodeCorrect(true);
        } catch (error) {
            setErrorMessage(error ||'Ошибка проверки кода')
        }
    }

    return (
        <View style={{ flexDirection: 'row', height: vs(40), width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    
            { isCodeSent ?

                <>
                    <TextInput
                        editable={!isCodeCorrect}
                        style={{ 
                            width: '60%', 
                            backgroundColor: isCodeCorrect ? '#F5F5F5' : 'white', 
                            height: '100%', 
                            fontSize: isTablet ? vs(12) : s(12), 
                            borderColor: errorMessage ? '#EB265D' : isCodeCorrect ? '#F5F5F5' : 'white', 
                            borderWidth: 2, 
                            borderRadius: 15, 
                            paddingHorizontal: 20,
                            color: 'black',
                            fontWeight: '600',
                        }}
                        value={code}
                        onChangeText={(text) => {
                            setCode(text)
                            if (errorMessage) setErrorMessage(null)
                        }}
                        keyboardType="numeric"
                        maxLength={6}
                        placeholder="______"
                    />
                    
                    <TouchableOpacity onPress={() => handleCheckSMS()} disabled={isCodeCorrect || loadingCheck} style={{ height: '100%', borderRadius: 15, backgroundColor: isCodeCorrect ? '#F5F5F5' : '#6A5AE0', width: '35%', justifyContent: 'center', alignItems: 'center' }}>
                        { loadingCheck ?
                            <ActivityIndicator size={'small'} color={'white'} />
                        :
                            <Text style={{ color: 'white', fontSize: isTablet ? vs(16) : vs(14), fontWeight: '600', textAlign: 'center' }}>{translations[store?.language]?.подтвердитькод}</Text>
                        }
                    </TouchableOpacity>
                </>
            :
                <>
                    <MaskInput
                        style={{ width: '60%', backgroundColor: isCodeCorrect ? '#F5F5F5' : 'white', height: '100%', fontSize: isTablet? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : isCodeCorrect ? '#F5F5F5' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20}}
                        value={phone}
                        onChangeText={(masked, unmasked) => {
                            if (errorMessage) setErrorMessage(null);

                            if (!masked.startsWith('+998')) {
                                masked = '+998';
                                unmasked = '998';
                            }

                            setPhone(masked);
                        }}
                        autoCapitalize="none"
                        textContentType="telephoneNumber"
                        onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                        mask={[
                            '+', '9', '9', '8', ' ',
                            '(', /\d/, /\d/, ')', ' ',
                            /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
                        ]}
                        keyboardType="numeric"
                        placeholder="+998 (__) ___-__-__"
                    />
                    
                    <TouchableOpacity onPress={() => hadleSendSMS()} disabled={!isPhoneValid || isCodeCorrect || loadingSend}  style={{ height: '100%', opacity: !isPhoneValid ? 0.5 : 1, borderRadius: 15, backgroundColor: isCodeCorrect ? '#F5F5F5' : '#6A5AE0', width: '35%', justifyContent: 'center', alignItems: 'center' }}>
                        { loadingSend ?
                            <ActivityIndicator size={'small'} color={'white'} />
                        :
                            <Text style={{ color: 'white', fontSize: isTablet ? vs(16) : vs(14), fontWeight: '600' }}>{translations[store?.language]?.получитькод}</Text>
                        }
                    </TouchableOpacity>
                </>
            }

        </View>
    )
}

export default PhoneAndCode