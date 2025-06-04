import { View, Text } from 'react-native'
import React from 'react'
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const DrawingLine = ({ lineEndX, lineEndY, lineStartX, lineStartY }) => {

    const animatedProps = useAnimatedProps(() => ({
        x1: lineStartX.value,
        y1: lineStartY.value,
        x2: lineEndX.value,
        y2: lineEndY.value,
    }));

    const arrowLength = 10; // длина стрелки

    const animatedArrow1 = useAnimatedProps(() => {
        const dx = lineEndX.value - lineStartX.value;
        const dy = lineEndY.value - lineStartY.value;
        const angle = Math.atan2(dy, dx);
        const arrowAngle1 = angle - Math.PI / 6; // -30 градусов

        return {
            x1: lineEndX.value,
            y1: lineEndY.value,
            x2: lineEndX.value - arrowLength * Math.cos(arrowAngle1),
            y2: lineEndY.value - arrowLength * Math.sin(arrowAngle1),
        };
    });

    const animatedArrow2 = useAnimatedProps(() => {
        const dx = lineEndX.value - lineStartX.value;
        const dy = lineEndY.value - lineStartY.value;
        const angle = Math.atan2(dy, dx);
        const arrowAngle2 = angle + Math.PI / 6; // +30 градусов

        return {
            x1: lineEndX.value,
            y1: lineEndY.value,
            x2: lineEndX.value - arrowLength * Math.cos(arrowAngle2),
            y2: lineEndY.value - arrowLength * Math.sin(arrowAngle2),
        };
    });

    return (
        <Svg
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
        >
            <AnimatedLine animatedProps={animatedProps} stroke="#504297" strokeWidth="2" />
            <AnimatedLine animatedProps={animatedArrow1} stroke="#504297" strokeWidth="2" />
            <AnimatedLine animatedProps={animatedArrow2} stroke="#504297" strokeWidth="2" />
        </Svg>
    );
};

export default DrawingLine