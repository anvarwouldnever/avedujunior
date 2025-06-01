import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ProgressBorder = ({
  percent = 0,
  size = 100,
  strokeWidth = 8,
  color = 'purple',
  baseColor = '#EFEEFC',
  fontSize = 15
}) => {
  const radius = ((size - 2) - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.max(0, Math.min(percent, 100));
  const progress = clampedPercent / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const innerCircleSize = size * 0.6;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        {/* Фоновая граница */}
        <Circle
          stroke={baseColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Прогресс */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Внутренний круг и текст */}
      <View style={{
        position: 'absolute',
        width: innerCircleSize,
        height: innerCircleSize,
        borderRadius: innerCircleSize / 2,
        backgroundColor: baseColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: color, fontSize, fontWeight: 'bold' }}>
          {`${clampedPercent}%`}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBorder;
