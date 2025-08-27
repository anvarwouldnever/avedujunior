import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'

const Sections = ({currentSection, setCurrentSection}) => {

    const { s, vs } = useScale();

    const navigation = useNavigation();

    const sections = [
        { name: translations[store.language].мойпрофиль },
        { name: translations[store.language].образовательноеучереждение },
        ...(store.juridical ? [{ name: translations[store.language].сменапароля }] : [])
    ];

    const logout = () => {
        SecureStore.deleteItemAsync('access_token')
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    return (
        <View style={{ gap: vs(15) }}>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: s(15) }} horizontal style={{ width: '100%', height: Platform.isPad? vs(25) : s(25) }}>
                {sections?.map((section, index) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setCurrentSection(section?.name)} key={index} style={{ justifyContent: 'center'}}>
                            <Text style={{ fontSize: Platform.isPad? vs(16 + 4) : vs(16), color: currentSection === section?.name ? '#9087E5' : 'black', fontWeight: '500' }}>{section.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <View style={{ borderWidth: 1, borderColor: '#F2F0FF' }} />

            <TouchableOpacity onPress={() => logout()} style={{ justifyContent: 'center', width: '60%' }}>
                <Text style={{ color: 'red', fontSize: Platform.isPad? vs(16 + 4) : vs(16), fontWeight: '400' }}>{translations[store.language].выходизсистемы}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Sections;