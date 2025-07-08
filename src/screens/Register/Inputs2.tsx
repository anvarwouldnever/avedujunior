import { View, Text, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'

const Inputs2 = ({ errorMessage, setErrorMessage, setPassword, setPassword2 }) => {

    const { s, vs } = useScale()

    const [isSecure, setIsSecure] = useState<boolean>(false)

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Пароль</Text>
                <View style={{ flexDirection: 'row', height: Platform.isPad? vs(40) : s(40), width: '100%', borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(12) : s(12)}}
                        placeholder={`Пароль`}
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
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Повторите пароль</Text>
                <View style={{ flexDirection: 'row', height: Platform.isPad? vs(40) : s(40), width: '100%', borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, borderRadius: 15, paddingHorizontal: 20, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(12) : s(12)}}
                        placeholder={`Повторите пароль`}
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

export default Inputs2