import { View, Text } from 'react-native'
import React from 'react'
import Map from './ReadinessMap/Map'
import { useScale } from '../../hooks/useScale'

const ReadinessMap = () => {

    const { s, vs } = useScale()

    return (
        <View style={{ width: '100%', height: 'auto', rowGap: vs(20) }}>

            <Map />

        </View>
    )
}

export default ReadinessMap