import { View, Text } from 'react-native'
import React from 'react'
import Lines from './Lines'
import DrawingLine from './DrawingLine'

const LinesAndDrawingParent = ({ lineStartX, lineStartY, lineEndX, lineEndY, lines }) => {
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, pointerEvents: 'none' }}>
            <DrawingLine lineEndX={lineEndX} lineEndY={lineEndY} lineStartX={lineStartX} lineStartY={lineStartY} />
            <Lines lineStartX={lineStartX} lineStartY={lineStartY} lineEndX={lineEndX} lineEndY={lineEndY} lines={lines} />
        </View>
    )
}

export default LinesAndDrawingParent