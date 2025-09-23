import { View, Text, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import translations from '../../../translations'
import { store } from '../../store/store'
import { observer } from 'mobx-react-lite'

const Inputs2 = ({ errorMessage, setErrorMessage, setPassword, setPassword2 }) => {

    const { s, vs, isTablet } = useScale()

    const [isSecure, setIsSecure] = useState<boolean>(false)

    const label = (key: string, fallbackKey: string) => store.labels?.[key] || translations[store?.language]?.[fallbackKey];

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('password', 'пароль')}</Text>
                <View style={{ flexDirection: 'row', height: isTablet? vs(40) : s(40), width: '100%', borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        style={{ width: '85%', height: '100%', fontSize: isTablet? vs(12) : s(12)}}
                        placeholder={label('password', 'пароль')}
                        placeholderTextColor="#999"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={isSecure}
                        autoCapitalize="none"
                        textContentType="password"
                        onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                    />
                    <Ionicons onPress={() => setIsSecure(prev => !prev)} name={isSecure ? 'eye-off-outline' : 'eye-outline'} size={vs(25)}/>
                </View>
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: isTablet? vs(12) : s(12) }}>{label('repeatPassword', 'повторитепароль')}</Text>
                <View style={{ flexDirection: 'row', height: isTablet? vs(40) : s(40), width: '100%', borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        style={{ width: '85%', height: '100%', fontSize: isTablet? vs(12) : s(12)}}
                        placeholder={label('repeatPassword', 'повторитепароль')}
                        placeholderTextColor="#999"
                        onChangeText={(text) => setPassword2(text)}
                        secureTextEntry={isSecure}
                        autoCapitalize="none"
                        textContentType="password"
                        onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                    />
                    <Ionicons onPress={() => setIsSecure(prev => !prev)} name={isSecure ? 'eye-off-outline' : 'eye-outline'} size={vs(25)}/>
                </View>
            </View>
        </View>
    )
}

export default observer(Inputs2)
