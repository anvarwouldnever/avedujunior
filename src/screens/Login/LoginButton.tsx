import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useScale } from '../../hooks/useScale'

const LoginButton = () => {

    const navigation = useNavigation()

    const { s, vs } = useScale()

    return (
        <TouchableOpacity onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })} style={{ width: '100%', height: Platform.isPad? vs(45) : s(45), backgroundColor: '#6A5AE0', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>Войти</Text>
        </TouchableOpacity>
    )
}

export default LoginButton