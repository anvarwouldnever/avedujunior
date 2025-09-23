import { View, Text, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale'
import { store } from '../../../store/store'

const Sections = ({ section, setSection }) => {
    
    const { s, vs, isTablet } = useScale()

    const sections = [
        { key: 'Первичный', label: store.labels?.primary },
        { key: 'Промежуточный', label: store.labels?.intermediate },
        { key: 'Итоговый', label: store.labels?.final },
    ]

    return (
        <ScrollView horizontal bounces showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: vs(8) }} style={{ flexDirection: 'row', height: 'auto' }}>
            {sections.map(item => {
                const isActive = section === item?.key
                return (
                    <TouchableOpacity key={item.label} onPress={() => setSection(item?.key)} style={{ backgroundColor: isActive ? '#6A5AE0' : '#EFEEFC', justifyContent: 'center', alignItems: 'center', padding: vs(14), borderRadius: vs(16) }}>
                        <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: isActive ? 'white' : '#17104B', fontWeight: isActive ? '600' : '500' }}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default Sections