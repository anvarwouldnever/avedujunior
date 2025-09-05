import { View, Text } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import LottieView from 'lottie-react-native'

const NotFoundKid = ({ text }) => {

    const { s, vs, isTablet } = useScale()

    return (
        <View style={{ marginVertical: vs(20) }}>
            <LottieView 
                autoPlay
                source={require('../../lotties/aveduKid.json')}
                style={{ width: vs(200), height: vs(200), alignSelf: 'center' }}
                loop
            />

            <Text style={{ fontSize: isTablet? vs(16) : vs(16), fontWeight: '600', alignSelf: 'center' }}>{text}</Text>
        </View>
    )
}

export default NotFoundKid