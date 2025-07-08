import { View, Text, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'

const PasswordChangeSection = () => {

    const { s, vs } = useScale()

    const [secureEntry1, setSecureEntry1] = useState<boolean>(false)
    const [secureEntry2, setSecureEntry2] = useState<boolean>(false)
    const [secureEntry3, setSecureEntry3] = useState<boolean>(false)

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            <View style={{gap: vs(10)}}>
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14) : s(14), fontWeight: '500'}}>Старый пароль</Text>
                <View style={{height: Platform.isPad? vs(50) : s(50), borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', paddingHorizontal: s(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput 
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(16) : s(16) }}
                        secureTextEntry={secureEntry1}
                    />
                    <Ionicons onPress={() => setSecureEntry1(!secureEntry1)} name={secureEntry1 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>
            </View>

            <View style={{gap: vs(10)}}>
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14) : s(14), fontWeight: '500'}}>Новый пароль</Text>
                <View style={{height: Platform.isPad? vs(50) : s(50), borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', paddingHorizontal: s(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput 
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(14) : s(16) }}
                        secureTextEntry={secureEntry2}
                    />
                    <Ionicons onPress={() => setSecureEntry2(!secureEntry2)} name={secureEntry2 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>
            </View>

            <View style={{gap: vs(10)}}>
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14) : s(14), fontWeight: '500'}}>Повторите новый пароль</Text>
                <View style={{height: Platform.isPad? vs(50) : s(50), borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', paddingHorizontal: s(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput 
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(14) : s(16) }}
                        secureTextEntry={secureEntry3}
                    />
                    <Ionicons onPress={() => setSecureEntry3(!secureEntry3)} name={secureEntry3 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>
            </View>
        </View>
    )
}

export default PasswordChangeSection;