import { View, Text } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import { observer } from 'mobx-react-lite'

const EducationalFacilitySection = ({ city, region, name }) => {
    const { s, vs, isTablet } = useScale()

    const cityLabel = store.labels?.city || translations[store.language]?.город
    const regionLabel = store.labels?.region || translations[store.language]?.регион
    const institutionLabel = store.labels?.institutionNameAndNumber || translations[store.language]?.institutionNameAndNumber

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            <View style={{ gap: vs(15) }}>
                <Text style={{ fontSize: isTablet ? vs(22) : s(18), fontWeight: '600' }}>{cityLabel}</Text>
                <Text style={{ color: '#333333', fontSize: isTablet ? vs(18) : s(18) }}>{city}</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{ fontSize: isTablet ? vs(22) : s(18), fontWeight: '600' }}>{regionLabel}</Text>
                <Text style={{ color: '#333333', fontSize: isTablet ? vs(18) : s(18) }}>{region}</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{ fontSize: isTablet ? vs(22) : s(18), fontWeight: '600' }}>{institutionLabel}</Text>
                <Text style={{ color: '#333333', fontSize: isTablet ? vs(18) : s(18) }}>{name}</Text>
            </View>
        </View>
    )
}

export default observer(EducationalFacilitySection)
