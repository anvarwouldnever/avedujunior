import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import translations from '../../../translations';
import { store } from '../../store/store';
import { useScale } from '../../hooks/useScale';
import { useNavigation } from '@react-navigation/native';

const LoginText = () => {

    const navigation = useNavigation()

    const { s, vs } = useScale()

    return (
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: vs(4) }}>
            <Text style={{ fontSize: vs(15), textAlign: 'center'}}>{translations[store?.language]?.ужеестьаккаунт}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ fontSize: vs(15), textAlign: 'center', color: '#6A5AE0', fontWeight: '600' }}>
                    {translations[store?.language]?.войти}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default LoginText