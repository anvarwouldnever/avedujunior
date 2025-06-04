import { View, Text } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';
import { Image } from 'expo-image';

const GameImage = React.memo(({ source }) => {

    const { s, vs } = useScale();

    return (
        <Image
            source={source}
            style={{
                width: s(50),
                height: vs(200),
                resizeMode: 'contain',
                borderRadius: 20,
            }}
            contentFit="contain"
            transition={0}
            cachePolicy='memory'
        />
    )
})

export default GameImage