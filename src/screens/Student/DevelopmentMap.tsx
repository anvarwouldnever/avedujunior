import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale';
import Sections from './DevelopmentMap/Sections';
import Conditions from './DevelopmentMap/Conditions';
import Map from './DevelopmentMap/Map';

const DevelopmentMap = () => {

    const { s, vs } = useScale()

    const [section, setSection] = useState<string>('Первичный')

    const isPad = Platform.isPad;

    return (
        <View style={{ width: '100%', height: 'auto', rowGap: vs(20) }}>
            
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(18) : vs(16), fontWeight: '500'}}>Карта развития ребенка 0-1 год</Text>

            <Sections section={section} setSection={setSection} />

            <Conditions />

            <Map />

        </View>
    )
}

export default DevelopmentMap;