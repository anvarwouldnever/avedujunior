import { View, Text } from 'react-native'
import React from 'react'
import { GestureDetector } from 'react-native-gesture-handler'
import GameImage from './GameImage'

const DraggableImage = React.memo(({ img, index, gesture, measure, s, vs }) =>{
    return (
        <GestureDetector gesture={gesture}>
            <View
                ref={(el) => measure(el, index)}
                style={{
                    width: s(50),
                    height: vs(210),
                    borderWidth: 2,
                    borderColor: '#EFEEFC',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <GameImage source={img} />
            </View>
        </GestureDetector>
    )
})

export default DraggableImage