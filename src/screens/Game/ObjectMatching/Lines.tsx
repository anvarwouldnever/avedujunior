import { View, Text, Animated } from 'react-native'
import React from 'react'
import { useAnimatedProps } from 'react-native-reanimated';
import Svg, { Line, Path } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const Lines = ({ lines, lineStartX, lineStartY, lineEndX, lineEndY, animatedProps }) => {

    return (
        <Svg
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
        >
            {lines.map((line, index) => {
                const controlX1 = line.x1;
                const controlY1 = line.y1;
                const controlX2 = line.x2;
                const controlY2 = line.y2;

                const pathData = `M ${line.x1},${line.y1} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${line.x2},${line.y2}`;

                return <Path key={index} d={pathData} stroke={line.color} strokeWidth="2" fill="none" />;
            })}

            <AnimatedLine onResponderMove={(_) => {}} animatedProps={animatedProps} stroke={"#504297"} strokeWidth="2" />
        </Svg>
    );
};

export default Lines