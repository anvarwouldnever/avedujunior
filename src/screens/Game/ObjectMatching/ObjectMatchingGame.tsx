import { View, InteractionManager, Platform } from 'react-native'
import React, { useState, useRef, useCallback, useMemo } from 'react'
import { useScale } from '../../../hooks/useScale';
import { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { images1, images2 } from '../staticAssets/Images';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const ObjectMatchingGame = ({ lineStartX, lineStartY, lineEndX, lineEndY, setLines, setSelectedImage, setFullImage }) => {

    const { s, vs, windowWidth } = useScale()

    const [centers, setCenters] = useState([]);
    const [bottomCenters, setBottomCenters] = useState([]); 

    const paddingVertical = Platform.isPad? vs(25) : vs(30)
    const paddingHorizontal = Platform.isPad? (s(10)) : vs(100)

    const bottomRefs = useRef([]);

    const columnGap = s(13);
    const rowGap = vs(35);

    const contSize = ((windowWidth - (Platform.isPad ? s(20) : s(30))) * 0.82) - vs(50)
    const contHeight = vs(420);

    const effectiveBorder = vs(1)
    const numColumns = 4;
    const totalGaps = columnGap * (numColumns - 1);
    const totalBorders = effectiveBorder * 2 * numColumns;

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns;

    const numRows = 2;
    const totalRowGaps = rowGap * (numRows - 1);
    const totalRowBorders = effectiveBorder * 2 * numRows;

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows;

    const cellSize = Math.min(cellWidth, cellHeight);

    const addCurvedLine = (data) => {
      setLines((prev) => {
          const filtered = prev.filter(
              (line) => line.x1 !== data.x1 || line.y1 !== data.y1
          );
  
          return [...filtered, data];
      });
  
      removeLine();
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
    };

    const isWithin = (x, y, cx, cy, size = 50) => {
        return Math.abs(x - cx) < size && Math.abs(y - cy) < size;
    };

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
        <View style={{width: contSize, height: 'auto', flexDirection: 'row', rowGap: rowGap, columnGap: columnGap, flexWrap: 'wrap'}}>
            {images1.map((img, index) => (
                <GestureDetector key={index} gesture={gestures[index]}>
                  <View
                      ref={(el) => measure(el, index)}
                      style={{
                          width: cellWidth,
                          height: cellHeight,
                          borderWidth: 2,
                          borderColor: '#EFEEFC',
                          borderRadius: 12,
                          overflow: 'hidden',
                          justifyContent: 'center',
                          alignItems: 'center'
                      }}
                  >
                      <Image
                          source={img}
                          style={{
                              width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                          }}
                          contentFit="contain"
                          transition={0}
                          cachePolicy='disk'
                      />
                      <Ionicons onPress={() => {
                          setSelectedImage(img);
                          setFullImage(true);
                      }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                  </View>
                </GestureDetector>
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
                        width: cellWidth,
                        height: cellHeight,
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