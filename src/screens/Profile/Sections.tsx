import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Sections = ({ currentSection, setCurrentSection }) => {

    const { s, vs } = useScale()

    const sections = [
        {name: 'Мой профиль'},
        {name: 'Образовательное учереждение'}, 
        {name: 'Смена пароля'}
    ]

    return (
        <View style={{ gap: vs(15) }}>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: s(15) }} horizontal style={{ width: '100%', height: Platform.isPad? vs(25) : s(25) }}>
                {sections.map((section, index) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setCurrentSection(section?.name)} key={index} style={{ justifyContent: 'center'}}>
                            <Text style={{ fontSize: vs(16), color: currentSection === section?.name ? '#9087E5' : 'black', fontWeight: '500' }}>{section.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <View style={{ borderWidth: 1, borderColor: '#F2F0FF' }}/>

            <TouchableOpacity style={{ justifyContent: 'center', width: '60%' }}>
                <Text style={{ color: 'red', fontSize: vs(16), fontWeight: '400' }}>Выход из системы</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Sections