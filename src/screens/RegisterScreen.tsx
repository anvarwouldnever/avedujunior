import { SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useScale } from '../hooks/useScale'
import Inputs from './Register/Inputs'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ProgressBar from './Register/ProgressBar'
import Inputs2 from './Register/Inputs2'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import * as ScreenOrientation from 'expo-screen-orientation'
import RegisterButton from './Register/RegisterButton'
import LoginText from './Register/LoginText'
import Inputs3 from './Register/Inputs3'
import registerChild from './Register/hooks/registerChild'

const RegisterScreen = () => {

    const { vs } = useScale();

    const [errorMessage, setErrorMessage] = useState<string>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const { register, error, loading } = registerChild();

    const navigation = useNavigation();

    const [name, setName] = useState<string>(null);
    const [surname, setSurname] = useState<string>(null);
    const [fathersName, setFathersName] = useState<string>(null);
    const [birthdate, setBirthdate] = useState<string>(null);
    const [homeAddress, setHomeAddress] = useState<string>(null);

    const [phone, setPhone] = useState<string>('+998');
    const [code, setCode] = useState<string>(null);
    const [parentName, setParentName] = useState<string>(null);
    const [parentSurname, setParentSurname] = useState<string>(null);
    const [parentFathersName, setParentFathersName] = useState<string>(null);
    const [parentWho, setParentWho] = useState<'0' | '1'>('0');
    const [address, setAddress] = useState<string>(null);

    const [password, setPassword] = useState<string>(null);
    const [password2, setPassword2] = useState<string>(null);

    const [progress, setProgress] = useState<number>(1);

    const translateY = useSharedValue(0);

    const hasEmptyFieldsChild = !name || !surname || !fathersName || !birthdate || !homeAddress;
    const hasEmptyFieldsParent = !phone || !code || !parentName || !parentSurname || !parentFathersName || !parentWho || !address;

    const animationUp = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    });

    useEffect(() => {
        translateY.value = 0
    }, [progress]);

    useFocusEffect(
        useCallback(() => {
            const lock = async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            };
            lock();
        }, [])
    );

    const handleRegister = async() => {
        try {
            await register(name, surname, fathersName, password, password2, homeAddress, birthdate, parentWho, parentName, parentSurname, parentFathersName, address, phone, code);
            setSuccess(true)
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        } catch (error) {
            setErrorMessage(error || 'Ошибка при регистрации')
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#EFEEFC' }}>
            <Animated.View style={[animationUp, { flex: 1, paddingHorizontal: vs(20), paddingVertical: vs(30), gap: vs(25), backgroundColor: '#EFEEFC', height: 'auto' }]}>

                <ProgressBar progress={progress} />

                { progress === 1 ? 
                    <Inputs translateY={translateY} setBirthdate={setBirthdate} setName={setName} setSurname={setSurname} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setFathersName={setFathersName} setHomeAddress={setHomeAddress} />
                : progress === 2 ?
                    <Inputs2 setErrorMessage={setErrorMessage} setPassword={setPassword} setPassword2={setPassword2} errorMessage={errorMessage} />
                : progress === 3 ?
                    <Inputs3 code={code} setCode={setCode} phone={phone} setPhone={setPhone} parentName={parentName} setParentName={setParentName} parentSurname={parentSurname} setParentSurname={setParentSurname} parentFathersName={parentFathersName} setParentFathersName={setParentFathersName} parentWho={parentWho} setParentWho={setParentWho} address={address} setAddress={setAddress} translateY={translateY} setErrorMessage={setErrorMessage} errorMessage={errorMessage}  />
                : null
                }

                <RegisterButton success={success} loading={loading} register={handleRegister} hasEmptyFieldsParent={hasEmptyFieldsParent} progress={progress} setProgress={setProgress} hasEmptyFieldsChild={hasEmptyFieldsChild} password={password} password2={password2} />

                <LoginText />

            </Animated.View>
        </SafeAreaView>
    )
}

export default RegisterScreen;