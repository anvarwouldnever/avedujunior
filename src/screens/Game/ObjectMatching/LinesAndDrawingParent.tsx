import { View, Text } from 'react-native'
import React from 'react'
import Lines from './Lines'
import DrawingLine from './DrawingLine'

const LinesAndDrawingParent = ({ lineStartX, lineStartY, lineEndX, lineEndY, lines, passed }) => {
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 100 }}>
            <DrawingLine lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} />
            <Lines passed={passed} lineStartX={lineStartX} lineStartY={lineStartY} lineEndX={lineEndX} lineEndY={lineEndY} lines={lines} />
        </View>
    )
}

export default LinesAndDrawingParent