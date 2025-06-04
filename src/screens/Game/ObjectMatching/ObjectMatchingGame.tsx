import { View, Text, Image, InteractionManager } from 'react-native'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useScale } from '../../../hooks/useScale';
import Svg, { Line, Path } from 'react-native-svg';
import Animated, { runOnJS, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import GameImage from './GameImage';
import { images1, images2 } from './Images';
import DraggableImage from './DraggableImage';

const ObjectMatchingGame = ({ lineStartX, lineStartY, lineEndX, lineEndY, setLines }) => {

    const { s, vs } = useScale()

    const [centers, setCenters] = useState([]);
    const [bottomCenters, setBottomCenters] = useState([]); 

    const bottomRefs = useRef([]);
    const refs = useRef([]);

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

    const measureCenter = (ref: any, callback: (centerX: number, centerY: number) => void) => {
        InteractionManager.runAfterInteractions(() => {
          requestAnimationFrame(() => {
            ref?.measureInWindow((x: number, y: number, width: number, height: number) => {
              const centerX = x + width / 2;
              const centerY = y + height / 2;
              callback(centerX, centerY);
            });
          });
        });
    };

    const createPanGesture = (index: number) => {
        return Gesture.Pan()
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
            lineEndX.value = event.absoluteX - paddingHorizontal;
            lineEndY.value = event.absoluteY - paddingVertical;
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
    };

    const measure = useCallback((el, index) => {
        measureCenter(el, (centerX, centerY) => {
          setCenters((prev) => ({
            ...prev,
            [index]: { centerX, centerY },
          }));
        });
    }, []);
      
    const gestures = useMemo(() => {
        return images1.map((_, index) => createPanGesture(index));
    }, [centers, bottomCenters]);

    return (
        <View style={{width: '100%', height: 'auto', flexDirection: 'row', rowGap: vs(40), flexWrap: 'wrap', justifyContent: 'space-between'}}>

            {images1.map((img, index) => (
                <DraggableImage
                    key={index}
                    img={img}
                    index={index}
                    gesture={gestures[index]}
                    measure={measure}
                    s={s}
                    vs={vs}
                />
            ))}

            {images2.map((img, index) => (
                <View
                    key={index}
                    ref={(el) => (bottomRefs.current[index] = el)}
                    onLayout={() =>
                        measureCenter(bottomRefs.current[index], (centerX, centerY) => {
                          setBottomCenters((prev) => {
                            const updated = [...prev];
                            updated[index] = {
                              centerX: centerX - paddingHorizontal,
                              centerY: centerY - paddingVertical,
                            };
                            return updated;
                          });
                        })
                    }
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