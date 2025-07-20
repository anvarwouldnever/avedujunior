import { View, Text, TextInput, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { observer } from 'mobx-react-lite';
import translations from '../../../translations';
import { store } from '../../store/store';

const Inputs = ({ setId, setPassword, errorMessage, setErrorMessage, selectedRole }) => {

    const { s, vs } = useScale();

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.введитеID} {selectedRole === translations[store?.language]?.организация ? "группы" : "ученика"}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, textAlignVertical: 'center', verticalAlign: 'middle' }}
                    placeholder={`${translations[store?.language]?.введитеID} ${selectedRole === translations[store?.language]?.организация? "группы" : "ученика"}`}
                    onChangeText={(text) => setId(text)}
                    autoCapitalize="none"
                    textContentType="username"
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />
            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                <Text style={{ fontSize: Platform.isPad? vs(12) : s(12) }}>{translations[store?.language]?.пароль}</Text>
                <TextInput 
                    style={{ backgroundColor: 'white', width: '100%', height: Platform.isPad? vs(40) : s(40), borderRadius: 15, paddingHorizontal: 20, fontSize: Platform.isPad? vs(12) : s(12), borderColor: errorMessage? '#EB265D' : 'white', borderWidth: 2, textAlignVertical: 'center', verticalAlign: 'middle' }}
                    placeholder={translations[store?.language]?.пароль}
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

export default observer(Inputs);