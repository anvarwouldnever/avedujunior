import { View, Text } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale';
import { Image } from 'expo-image';

const GameImage = React.memo(({ source, cellWidth, cellSize }) => {
    const { s, vs } = useScale();
  
    return (
      <Image
        source={source}
        style={{
          width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
        }}
        contentFit="contain"
        transition={0}
        cachePolicy='disk'
      />
    );
}, (prev, next) => prev.source === next.source);

export default GameImage;