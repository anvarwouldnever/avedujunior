import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import translations from '../../../translations'
import { store } from '../../store/store'
import { putPassword } from './hooks/putPassword'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { observer } from 'mobx-react-lite'

const PasswordChangeSection = () => {

    const { s, vs, isTablet } = useScale()

    const [secureEntry1, setSecureEntry1] = useState(false)
    const [secureEntry2, setSecureEntry2] = useState(false)
    const [secureEntry3, setSecureEntry3] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const { changePassword, resetSuccess, loading, error, success } = putPassword()

    useEffect(() => {
        if (success) {
            setOldPassword('')
            setNewPassword('')
            setNewPassword2('')

            const timer = setTimeout(() => resetSuccess(), 3000)
            return () => clearTimeout(timer)
        }
    }, [success])

    // Метки с приоритетом store.labels
    const oldPasswordLabel = store.labels?.oldPassword || translations[store.language]?.старыйпароль
    const newPasswordLabel = store.labels?.newPassword || translations[store.language]?.новыйпароль
    const repeatPasswordLabel = store.labels?.repeatNewPassword || translations[store.language]?.повторитеновыйпароль
    const saveLabel = store.labels?.save || 'Сохранить'
    const successLabel = store.labels?.passwordChangeSuccess || 'Вы успешно изменили пароль!'

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            {/* Старый пароль */}
            <View style={{ gap: vs(10) }}>
                <Text style={{ color: '#333', fontSize: isTablet ? vs(18) : s(14), fontWeight: '500' }}>{oldPasswordLabel}</Text>
                <View style={{ height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', maxWidth: 500, paddingVertical: isTablet ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={oldPassword}
                        style={{ width: '85%', height: '100%', fontSize: isTablet ? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry1}
                        onChangeText={setOldPassword}
                    />
                    <Ionicons onPress={() => setSecureEntry1(!secureEntry1)} name={secureEntry1 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)} />
                </View>
            </View>

            {/* Новый пароль */}
            <View style={{ gap: vs(10) }}>
                <Text style={{ color: '#333', fontSize: isTablet ? vs(18) : s(14), fontWeight: '500' }}>{newPasswordLabel}</Text>
                <View style={{ height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', maxWidth: 500, paddingVertical: isTablet ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={newPassword}
                        style={{ width: '85%', height: '100%', fontSize: isTablet ? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry2}
                        onChangeText={setNewPassword}
                    />
                    <Ionicons onPress={() => setSecureEntry2(!secureEntry2)} name={secureEntry2 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)} />
                </View>
            </View>

            {/* Повторить новый пароль */}
            <View style={{ gap: vs(10) }}>
                <Text style={{ color: '#333', fontSize: isTablet ? vs(18) : s(14), fontWeight: '500' }}>{repeatPasswordLabel}</Text>
                <View style={{ height: 'auto', borderWidth: 2, borderColor: '#F2F0FF', borderRadius: 20, width: '100%', maxWidth: 500, paddingVertical: isTablet ? vs(10) : vs(5), paddingHorizontal: vs(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={newPassword2}
                        style={{ width: '85%', height: '100%', fontSize: isTablet ? vs(18) : vs(16) }}
                        secureTextEntry={secureEntry3}
                        onChangeText={setNewPassword2}
                    />
                    <Ionicons onPress={() => setSecureEntry3(!secureEntry3)} name={secureEntry3 ? 'eye-off-outline' : 'eye-outline'} size={vs(35)} />
                </View>

                {error && <Animated.Text entering={FadeIn} exiting={FadeOut} style={{ color: '#EA4335', fontSize: isTablet ? vs(18) : vs(16), fontWeight: '500' }}>{error}</Animated.Text>}
                {success && <Animated.Text entering={FadeIn} exiting={FadeOut} style={{ color: '#59E956', fontSize: isTablet ? vs(18) : vs(16), fontWeight: '500', marginTop: vs(20) }}>{successLabel}</Animated.Text>}
            </View>

            <TouchableOpacity onPress={() => changePassword(oldPassword, newPassword, newPassword2)} style={{ backgroundColor: '#9087E5', width: '50%', justifyContent: 'center', alignItems: 'center', padding: vs(15), borderRadius: 20, maxWidth: 200 }}>
                {loading ? <ActivityIndicator size={isTablet ? vs(18) : vs(16)} color={'white'} /> : <Text style={{ color: 'white', fontSize: isTablet ? vs(18) : vs(16), textAlign: 'center', fontWeight: '500' }}>{saveLabel}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default observer(PasswordChangeSection)
