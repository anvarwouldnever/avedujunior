import { View, Text, TextInput, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Inputs = () => {

    const { s, vs } = useScale()

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Введите ID группы</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12) }}
                    placeholder='Введите ID группы'
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Пароль</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12) }}
                    placeholder='Пароль'
                />
            </View>
        </View>
    )
}

export default Inputs