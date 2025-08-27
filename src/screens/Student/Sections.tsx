import { View, Text, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const Sections = ({ section, setSection }) => {
    
    const { s, vs } = useScale()

    const sections = [
        { key: 'info', label: 'Общая информация' },
        { key: 'parents', label: 'Родители' },
        { key: 'development', label: 'Карта развития' },
        { key: 'readiness', label: 'Карта готовности' },
    ]

    return (
        <ScrollView horizontal bounces showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: vs(8) }} style={{ flexDirection: 'row', height: 'auto' }}>
            {sections.map(item => {
                const isActive = section === item?.label
                return (
                    <TouchableOpacity key={item.key} onPress={() => setSection(item?.label)} style={{ backgroundColor: isActive ? '#6A5AE0' : '#EFEEFC', justifyContent: 'center', alignItems: 'center', padding: vs(12), borderRadius: vs(16) }}>
                        <Text style={{ fontSize: Platform.isPad ? vs(18) : vs(16), color: isActive ? 'white' : '#17104B', fontWeight: isActive ? '600' : '500' }}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default Sections
