import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'

const Sections = ({ currentSection, setCurrentSection }) => {

    const { s, vs, isTablet } = useScale();
    const navigation = useNavigation();

    // Метки с приоритетом store.labels
    const myProfileLabel = store.labels?.myProfile || translations[store.language]?.мойпрофиль;
    const educationalFacilityLabel = store.labels?.educationalFacility || translations[store.language]?.образовательноеучереждение;
    const changePasswordLabel = store.labels?.changePassword || translations[store.language]?.сменапароля;
    const logoutLabel = store.labels?.logout || translations[store.language]?.выходизсистемы;

    const sections = [
        { name: myProfileLabel, key: 'myProfile' },
        { name: educationalFacilityLabel, key: 'educationalFacility' },
        ...(store.juridical ? [{ name: changePasswordLabel, key: 'changePassword' }] : [])
    ];

    const logout = () => {
        SecureStore.deleteItemAsync('access_token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    return (
        <View style={{ gap: vs(15) }}>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: s(15) }} horizontal style={{ width: '100%', height: isTablet ? vs(25) : s(25) }}>
                {sections?.map((section, index) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setCurrentSection(section?.key)} key={index} style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: isTablet ? vs(16 + 4) : vs(16), color: currentSection === section?.key ? '#9087E5' : 'black', fontWeight: '500' }}>{section.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={{ borderWidth: 1, borderColor: '#F2F0FF' }} />

            <TouchableOpacity onPress={() => logout()} style={{ justifyContent: 'center', width: '60%' }}>
                <Text style={{ color: 'red', fontSize: isTablet ? vs(16 + 4) : vs(16), fontWeight: '400' }}>{logoutLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default observer(Sections);
