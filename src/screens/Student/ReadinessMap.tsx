import React from 'react'
import Map from './ReadinessMap/Map'
import { useScale } from '../../hooks/useScale'
import { getMap } from './hooks/getMap'
import Animated from 'react-native-reanimated'

const ReadinessMap = () => {

    const { s, vs } = useScale()

    const { map, error, loading } = getMap('readiness')

    return (
        <Animated.View style={{ width: '100%', height: 'auto', rowGap: vs(20) }}>
            
            <Map map={map} />

        </Animated.View>
    )
}

export default ReadinessMap;