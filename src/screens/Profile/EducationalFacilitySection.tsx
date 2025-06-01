import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'

const EducationalFacilitySection = () => {

    const { s, vs } = useScale()

    return (
        <View style={{ gap: vs(35), marginBottom: 100  }}>
            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Город</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(14) : s(18), }}>Sirdarya</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Регион</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18) : s(18), }}>Sirdarya region</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(14) : s(18), fontWeight: '600'}}>Название и № ОУ</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18) : s(18), }}>Zebi2 Ziynar2</Text>
            </View>
        </View>
    )
}

export default EducationalFacilitySection;