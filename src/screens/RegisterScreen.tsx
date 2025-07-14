import { View, SafeAreaView, Text, Platform, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScale } from '../hooks/useScale'
import Inputs from './Register/Inputs'
import { useNavigation } from '@react-navigation/native'
import ProgressBar from './Register/ProgressBar'
import Inputs2 from './Register/Inputs2'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const RegisterScreen = () => {

    const { s, vs } = useScale();

    const [errorMessage, setErrorMessage] = useState<string>(null);

    const [name, setName] = useState<string>(null);
    const [surname, setSurname] = useState<string>(null);
    const [fathersName, setFathersName] = useState<string>(null);
    const [birthdate, setBirthdate] = useState<string>(null);
    const [homeAddress, setHomeAddress] = useState<string>(null);

    const [password, setPassword] = useState<string>(null);
    const [password2, setPassword2] = useState<string>(null);

    const navigation = useNavigation();

    const [progress, setProgress] = useState<number>(1);

    const translateY = useSharedValue(0)

    const RegisterButton = () => {

        let isButtonDisabled = false;

        if (progress === 1) {
            const hasEmptyFields = !name || !surname || !fathersName || !birthdate || !homeAddress;
            isButtonDisabled = hasEmptyFields;
        } else if (progress === 2) {
            const arePasswordsSame = password === password2;
            const arePasswordsEmpty = !password || !password2;
            isButtonDisabled = !arePasswordsSame || arePasswordsEmpty;
        }

        const handlePress = () => {
            if (isButtonDisabled) return;
            setProgress((prev) => Math.min(prev + 1, 3));
        };

        return (
            <TouchableOpacity onPress={() => handlePress()} style={{ width: '100%', height: Platform.isPad? vs(45) : s(45), backgroundColor: '#6A5AE0', opacity: isButtonDisabled ? 0.5 : 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>{progress === 1 || progress === 2 ? "Продолжить" : progress === 3 && "Зарегистрировать ребенка в системе"}</Text>
            </TouchableOpacity>
        )
    };

    const LoginText = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: s(4) }}>
                <Text style={{ fontSize: s(15), textAlign: 'center'}}>Уже есть аккаунт?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}><Text style={{ fontSize: s(15), textAlign: 'center', color: '#6A5AE0', fontWeight: '600' }}>Войти</Text></TouchableOpacity>
            </View>
        )
    };

    const Inputs3 = () => {
        return (
            <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
                <View style={{gap: vs(10), width: '100%'}}>
                    <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Введите номер</Text>
                    <View style={{ flexDirection: 'row', height: Platform.isPad? vs(40) : s(40), width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput
                            style={{ width: '60%', backgroundColor: 'white', height: '100%', fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20}}
                            placeholder={`Введите ваш телефон`}
                            onChangeText={(text) => setPassword(text)}
                            autoCapitalize="none"
                            textContentType="password"
                            onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                        />
                        <TouchableOpacity style={{ height: '100%', borderRadius: 15, backgroundColor: '#6A5AE0', width: '35%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: s(14), fontWeight: '600' }}>Получить код</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const animationUp = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    })

    useEffect(() => {
        translateY.value = 0
    }, [progress])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#EFEEFC' }}>
            <Animated.View style={[animationUp, { flex: 1, paddingHorizontal: vs(20), paddingVertical: vs(30), gap: vs(25), backgroundColor: '#EFEEFC', height: 'auto' }]}>
                
                <ProgressBar progress={progress} />
                
                { progress === 1 ? 
                    <Inputs translateY={translateY} setBirthdate={setBirthdate} setName={setName} setSurname={setSurname} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setFathersName={setFathersName} setHomeAddress={setHomeAddress} />
                : progress === 2 ?
                    <Inputs2 setErrorMessage={setErrorMessage} setPassword={setPassword} setPassword2={setPassword2} errorMessage={errorMessage} />
                : progress === 3 ?
                    <Inputs3 />
                : null
                }
                
                <RegisterButton />

                <LoginText />

            </Animated.View>
        </SafeAreaView>
    )
}

export default RegisterScreen;