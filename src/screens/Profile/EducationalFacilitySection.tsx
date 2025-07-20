import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'

const EducationalFacilitySection = ({ city, region, name }) => {

    const { s, vs } = useScale()

    return (
        <View style={{ gap: vs(35), marginBottom: 100  }}>
            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18 + 4) : s(18), fontWeight: '600'}}>{translations[store.language].город}</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(14 + 4) : s(18), }}>{city}</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18 + 4) : s(18), fontWeight: '600'}}>{translations[store.language].регион}</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18 + 4) : s(18), }}>{region}</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(14 + 4) : s(18), fontWeight: '600'}}>{translations[store.language].названиеи} № ОУ</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18 + 4) : s(18), }}>{name}</Text>
            </View>
        </View>
    )
}

export default EducationalFacilitySection;