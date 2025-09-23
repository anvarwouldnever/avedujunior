import { Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { store } from '../../store/store'

const Sections = ({ section, setSection }) => {
    
    const { s, vs, isTablet } = useScale()

    const sections = [
        { key: 'info', label: store.labels?.generalInformation },
        { key: 'parents', label: store.labels?.parents },
        { key: 'development', label: store.labels?.developmentMap },
        { key: 'readiness', label: store.labels?.readinessMap  },
    ]

    return (
        <ScrollView horizontal bounces showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: vs(8) }} style={{ flexDirection: 'row', height: 'auto' }}>
            {sections.map(item => {
                const isActive = section === item?.key
                return (
                    <TouchableOpacity key={item.key} onPress={() => setSection(item?.key)} style={{ backgroundColor: isActive ? '#6A5AE0' : '#EFEEFC', justifyContent: 'center', alignItems: 'center', padding: vs(14), borderRadius: vs(16) }}>
                        <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: isActive ? 'white' : '#17104B', fontWeight: isActive ? '600' : '500' }}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default Sections
