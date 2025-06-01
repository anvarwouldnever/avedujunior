import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Logo from '../components/Logo';
import { useScale } from '../hooks/useScale';
import { store } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import ChooseLanguage from './Login/ChooseLanguage';
import ChooseRole from './Login/ChooseRole';
import Inputs from './Login/Inputs';
import LoginButton from './Login/LoginButton';

const LoginScreen = () => {

    const { s, vs } = useScale()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#EFEEFC' }}>
            <View style={{ flex: 1, paddingHorizontal: vs(20), paddingVertical: vs(60), gap: vs(25), backgroundColor: '#EFEEFC', height: 'auto'}}>
                {/* <View style={{ width: '100%' }}>
                    <Logo />
                </View> */}
                {/* <Text style={{ fontSize: vs(24), fontWeight: '600' }}>Вход в платформу Avedu Junior</Text> */}
                <ChooseLanguage />

                <ChooseRole />

                <Inputs />

                <LoginButton />
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;