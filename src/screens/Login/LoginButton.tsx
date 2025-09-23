import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useScale } from '../../hooks/useScale'
import { LoginChild, LoginGroup } from '../../api/methods/auth/auth'
import * as SecureStore from 'expo-secure-store';
import translations from '../../../translations'
import { store } from '../../store/store'
import { observer } from 'mobx-react-lite'

type Role = 'organization' | 'personal'

const LoginButton = ({ id, password, setErrorMessage, setThinking, thinking, selectedRole }: { id: string, password: string, setErrorMessage: (msg: string | null) => void, setThinking: (val: boolean) => void, thinking: boolean, selectedRole: Role}) => {
    const navigation = useNavigation();
    const { s, vs, isTablet } = useScale();

    const loginText = store.labels?.войти || translations[store.language]?.войти;

    const loginGroup = async () => {
        try {
            setThinking(true)
            const response = await LoginGroup(id, password);
            const access = response?.data?.group?.access_level
            const token = response?.data?.access_token
            if (token) {
                await SecureStore.setItemAsync('access_token', token);
                store.setAccess(access)
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
            } else {
                throw new Error('Токен не получен с сервера');
            }
        } catch (e) {
            setErrorMessage(e?.response?.data?.message || e?.message || 'Ошибка входа')
        } finally {
            setThinking(false)
        }
    }

    const loginChild = async () => {
        try {
            setThinking(true)
            const response = await LoginChild(id, password);
            const token = response?.data?.access_token
            if (token) {
                await SecureStore.setItemAsync('access_token', token);
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
            } else {
                throw new Error('Токен не получен с сервера');
            }
        } catch (e) {
            setErrorMessage(e?.response?.data?.message || e?.message || 'Ошибка входа')
        } finally {
            setThinking(false)
        }
    }

    return (
        <TouchableOpacity
            onPress={
                thinking || !id || !password
                    ? () => {}
                    : selectedRole === 'organization'
                        ? () => loginGroup()
                        : () => loginChild()
            }
            style={{
                width: '100%',
                height: isTablet ? vs(45) : s(45),
                opacity: !id || !password ? 0.5 : 1,
                backgroundColor: '#6A5AE0',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {thinking ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={{ color: 'white', fontWeight: '600', fontSize: isTablet ? vs(14) : s(14) }}>
                    {loginText}
                </Text>
            )}
        </TouchableOpacity>
    )
}

export default observer(LoginButton);
