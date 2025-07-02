import { View, Text, TextInput, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Inputs = ({ setId, setPassword, errorMessage, setErrorMessage, selectedRole }) => {

    const { s, vs } = useScale();

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Введите ID {selectedRole === 'Организация'? "группы" : "ученика"}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder={`Введите ID ${selectedRole === 'Организация'? "группы" : "ученика"}`}
                    onChangeText={(text) => setId(text)}
                    autoCapitalize="none"
                    textContentType="username"
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>Пароль</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2 }}
                    placeholder='Пароль'
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="password"
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>
        </View>
    )
}

export default Inputs;