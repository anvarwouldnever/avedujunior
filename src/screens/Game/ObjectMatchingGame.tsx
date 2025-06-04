import { View, Text, Image, InteractionManager } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useScale } from '../../hooks/useScale';
import Svg, { Line, Path } from 'react-native-svg';
import Animated, { runOnJS, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import GameImage from './ObjectMatching/GameImage';

const ObjectMatchingGame = ({ lineStartX, lineStartY, lineEndX, lineEndY, setLines }) => {

    const { s, vs } = useScale()

    const images1 = [
        require('../../screens/Game/staticAssets/gameImg1.png'),
        require('../../screens/Game/staticAssets/gameImg2.png'),
        require('../../screens/Game/staticAssets/gameImg3.png'),
        require('../../screens/Game/staticAssets/gameImg4.png'),
    ];

    const images2 = [
        require('../../screens/Game/staticAssets/gameImg1.png'),
        require('../../screens/Game/staticAssets/gameImg2.png'),
        require('../../screens/Game/staticAssets/gameImg3.png'),
        require('../../screens/Game/staticAssets/gameImg4.png'),
    ];

    const [centers, setCenters] = useState([]);
    const bottomRefs = useRef([]);
    const refs = useRef([]);
    const [bottomCenters, setBottomCenters] = useState([]); 

    const addCurvedLine = (data) => {
        setLines((prev) => [...prev, data]);
        removeLine()
    };

    const checkIfMatched = (absX, absY, lineStartX, lineStartY, bottomCenters, addCurvedLine) => {
        for (let i = 0; i < bottomCenters.length; i++) {
          const center = bottomCenters[i];
          if (center && isWithin(absX, absY, center.centerX, center.centerY)) {
            console.log(`✅ Попал в элемент с индексом ${i}`);
            addCurvedLine({
              x1: lineStartX.value,
              y1: lineStartY.value,
              x2: center.centerX,
              y2: center.centerY,
              color: "#504297"
            });
            return;
          }
        }
                    
        removeLine()
    };

    const removeLine = () => {
        lineStartX.value = 0;
        lineStartY.value = 0;
        lineEndX.value = 0;
        lineEndY.value = 0;
    }

    const isWithin = (x, y, cx, cy, size = 50) => {
        return Math.abs(x - cx) < size && Math.abs(y - cy) < size;
    };

    const paddingVertical = vs(30)
    const paddingHorizontal = vs(100)

    return (
        <View style={{width: '100%', height: 'auto', flexDirection: 'row', rowGap: vs(40), flexWrap: 'wrap', justifyContent: 'space-between'}}>

            {images1.map((img, index) => {

                const gesture = Gesture.Pan()
                .onBegin(() => {
                    const center = centers[index];
                    if (center) {
                        lineStartX.value = center.centerX - paddingHorizontal;
                        lineStartY.value = center.centerY - paddingVertical;
                        lineEndX.value = center.centerX - paddingHorizontal;
                        lineEndY.value = center.centerY - paddingVertical;
                    }
                })
                .onUpdate((event) => {
                    lineEndX.value = event.absoluteX - paddingHorizontal
                    lineEndY.value = event.absoluteY - paddingVertical
                })
                .onEnd((event) => {
                    runOnJS(checkIfMatched)(
                      event.absoluteX - paddingHorizontal,
                      event.absoluteY - paddingVertical,
                      lineStartX,
                      lineStartY,
                      bottomCenters,
                      addCurvedLine
                    );
                });            

                return (
                    <GestureDetector key={index} gesture={gesture}>
                        <View 
                            ref={(el) => (refs.current[index] = el)}
                            onLayout={() => {
                                const currentIndex = index;

                                InteractionManager.runAfterInteractions(() => {
                                    requestAnimationFrame(() => {
                                        refs.current[currentIndex]?.measureInWindow((x, y, width, height) => {
                                            setCenters((prev) => ({
                                                ...prev,
                                                [currentIndex]: {
                                                    centerX: x + width / 2,
                                                    centerY: y + height / 2,
                                                },
                                            }));
                                        });
                                    });
                                });
                            }} style={{ width: s(50), height: vs(210), borderWidth: 2, borderColor: '#EFEEFC', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            <GameImage source={img}/>
                        </View>
                    </GestureDetector>
                )
            })}

            {images2.map((img, index) => (
                <View
                    key={index}
                    ref={(el) => (bottomRefs.current[index] = el)}
                    onLayout={() => {
                    InteractionManager.runAfterInteractions(() => {
                        requestAnimationFrame(() => {
                            bottomRefs.current[index]?.measureInWindow((x, y, width, height) => {
                                setBottomCenters((prev) => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    centerX: x + width / 2 - paddingHorizontal,
                                    centerY: y + height / 2 - paddingVertical,
                                  };
                                  return updated;
                                });
                              });                              
                        });
                    });
                    }}
                        style={{
                        width: s(50),
                        height: vs(210),
                        borderWidth: 2,
                        borderColor: '#EFEEFC',
                        borderRadius: 20,
                        backgroundColor: 'white',
                    }}
                />
            ))}
        </View>
    )
}

export default ObjectMatchingGame;