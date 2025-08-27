import { View, Text, TextInput, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import translations from '../../../translations'
import { store } from '../../store/store'
import { changeUser } from './hooks/changeUser'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const PasswordChangeSection = () => {

    const { s, vs } = useScale()

    const [secureEntry1, setSecureEntry1] = useState<boolean>(false);
    const [secureEntry2, setSecureEntry2] = useState<boolean>(false);
    const [secureEntry3, setSecureEntry3] = useState<boolean>(false);

    const [oldPassword, setOldPassword] = useState<string>(null)
    const [newPassword, setNewPassword] = useState<string>(null)
    const [newPassword2, setNewPassword2] = useState<string>(null)

    const { changePassword, resetSuccess, loading, error, success } = changeUser();

    useEffect(() => {
        if (success) {
            setOldPassword('');
            setNewPassword('');
            setNewPassword2('');
    
            const timer = setTimeout(() => {
                resetSuccess();
            }, 3000);
    
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            
            <View style={{gap: vs(10)}}>
                
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14 + 4) : s(14), fontWeight: '500'}}>{translations[store.language].старыйпароль}</Text>
                
                <View style={{height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%',  maxWidth: 500, paddingVertical: Platform.isPad ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput
                        value={oldPassword}
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry1}
                        onChangeText={(text) => setOldPassword(text)}
                    />
                    <Ionicons onPress={() => setSecureEntry1(!secureEntry1)} name={secureEntry1 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>

            </View>

            <View style={{gap: vs(10)}}>
                
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14 + 4) : s(14), fontWeight: '500'}}>{translations[store.language].новыйпароль}</Text>
                
                <View style={{height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%',  maxWidth: 500, paddingVertical: Platform.isPad ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput
                        value={newPassword} 
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry2}
                        onChangeText={(text) => setNewPassword(text)}
                    />
                    <Ionicons onPress={() => setSecureEntry2(!secureEntry2)} name={secureEntry2 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>

            </View>

            <View style={{gap: vs(10)}}>
                
                <Text style={{color: '#333333', fontSize: Platform.isPad? vs(14 + 4) : s(14), fontWeight: '500'}}>{translations[store.language].повторитеновыйпароль}</Text>
                
                <View style={{height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', maxWidth: 500,paddingVertical: Platform.isPad ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextInput 
                        value={newPassword2}
                        style={{ width: '85%', height: '100%', fontSize: Platform.isPad? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry3}
                        onChangeText={(text) => setNewPassword2(text)}
                    />
                    <Ionicons onPress={() => setSecureEntry3(!secureEntry3)} name={secureEntry3 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)}/>
                </View>

                {error && <Animated.Text entering={FadeIn} exiting={FadeOut} style={{ color: '#EA4335', fontSize: Platform.isPad ? vs(18) : vs(16), fontWeight: '500' }}>{error}</Animated.Text>}
                
                {success && <Animated.Text entering={FadeIn} exiting={FadeOut} style={{ color: '#59E956', fontSize: Platform.isPad ? vs(18) : vs(16), fontWeight: '500', marginTop: vs(20) }}>{'Вы успешно изменили пароль!'}</Animated.Text>}
            
            </View>

            <TouchableOpacity onPress={() => changePassword(oldPassword, newPassword, newPassword2)} style={{ backgroundColor: '#9087E5', width: '50%', justifyContent: 'center', alignItems: 'center', padding: vs(15), borderRadius: 20, maxWidth: 200 }}>
                {loading ? 
                    <ActivityIndicator size={Platform.isPad ? vs(18) : vs(16)} color={'white'} style={{ alignSelf: 'center' }} />
                :
                    <Text style={{ color: 'white', fontSize: Platform.isPad ? vs(18) : vs(16), textAlign: 'center', fontWeight: '500' }}>Сохранить</Text>
                }
            </TouchableOpacity>

        </View>
    )
}

export default PasswordChangeSection;