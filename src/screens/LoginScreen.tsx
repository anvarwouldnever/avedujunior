import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale';
import ChooseLanguage from './Login/ChooseLanguage';
import ChooseRole from './Login/ChooseRole';
import Inputs from './Login/Inputs';
import LoginButton from './Login/LoginButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const { s, vs } = useScale()
    const [id, setId] = useState<string>(null)
    const [password, setPassword] = useState<string>(null)
    const [errorMessage, setErrorMessage] = useState<string>(null)
    const [thinking, setThinking] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState('Организация');

    const navigation = useNavigation();

    const RegisterText = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: s(4) }}>
                <Text style={{ fontSize: s(15), textAlign: 'center'}}>Нет аккаунта?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}><Text style={{ fontSize: s(15), textAlign: 'center', color: '#6A5AE0', fontWeight: '600' }}>Зарегистрироваться</Text></TouchableOpacity>
            </View>
        )
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#EFEEFC' }}>
            <View style={{ flex: 1, paddingHorizontal: vs(20), paddingVertical: vs(60), gap: vs(25), backgroundColor: '#EFEEFC', height: 'auto'}}>
                <ChooseLanguage thinking={thinking} />

                <ChooseRole thinking={thinking} selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>

                <Inputs setId={setId} setPassword={setPassword} errorMessage={errorMessage} setErrorMessage={setErrorMessage} selectedRole={selectedRole} />

                {errorMessage && <Text style={{color: '#EB265D', textAlign: 'center'}}>{errorMessage}</Text>}

                <LoginButton id={id} password={password} setErrorMessage={setErrorMessage} setThinking={setThinking} thinking={thinking} selectedRole={selectedRole}/>

                <RegisterText />
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;



















{/* <View style={{ width: '100%' }}>
                    <Logo />
                </View> */}
                {/* <Text style={{ fontSize: vs(24), fontWeight: '600' }}>Вход в платформу Avedu Junior</Text> */}