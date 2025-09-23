import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { observer } from 'mobx-react-lite';
import translations from '../../../translations';
import { store } from '../../store/store';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type Role = 'organization' | 'personal'

const Inputs = ({ setId, setPassword, errorMessage, setErrorMessage, selectedRole }: { setId: (text: string) => void, setPassword: (text: string) => void, errorMessage: string | null, setErrorMessage: (val: string | null) => void, selectedRole: Role}) => {
    
    const { s, vs, isTablet } = useScale();

    const [secureEntry, setSecureEntry] = useState<boolean>(false)

    const roleText = selectedRole === 'organization' ? 'группы' : 'ученика';

    const enterIdText = store.labels?.введитеID || translations[store?.language]?.введитеID;
    const passwordText = store.labels?.пароль || translations[store?.language]?.пароль;

    return (
        <View style={{width: '100%', height: 'auto', gap: vs(15)}}>
            
            <View style={{gap: vs(10), width: '100%'}}>
                
                <Text style={{ fontSize: isTablet? vs(14) : vs(12) }}>
                    {enterIdText} {roleText}
                </Text>
                
                <TextInput 
                    style={{ 
                        backgroundColor: 'white', width: '100%', height: vs(40), 
                        borderRadius: 15, paddingHorizontal: 20, fontSize: isTablet? vs(14) : vs(12), 
                        borderColor: errorMessage ? '#EB265D' : 'white', borderWidth: 2, textAlignVertical: 'center' 
                    }}
                    placeholder={`${enterIdText} ${roleText}`}
                    placeholderTextColor="#999"
                    onChangeText={(text) => setId(text)}
                    autoCapitalize="none"
                    textContentType="username"
                    autoCorrect={false}
                    onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                />

            </View>

            <View style={{gap: vs(10), width: '100%'}}>
                
                <Text style={{ fontSize: isTablet? vs(14) : vs(12) }}>
                    {passwordText}
                </Text>

                <View style={{ backgroundColor: 'white', width: '100%', height: vs(40), borderRadius: 15, paddingHorizontal: 20, borderColor: errorMessage ? '#EB265D' : 'white', borderWidth: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    
                    <TextInput 
                        style={{ 
                            fontSize: isTablet? vs(14) : vs(12), 
                            textAlignVertical: 'center',
                            width: '85%',
                            height: '100%'  
                        }}
                        placeholder={passwordText}
                        placeholderTextColor="#999"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={secureEntry}
                        autoCapitalize="none"
                        textContentType="password"
                        autoCorrect={false}
                        onFocus={() => setErrorMessage(prev => (prev != null ? null : prev))}
                    />

                    <Ionicons onPress={() => setSecureEntry(!secureEntry)} name={secureEntry ? 'eye-off-outline' : 'eye-outline'} size={vs(25)} />

                </View>

            </View>

        </View>
    )
}

export default observer(Inputs);
