import { View, InteractionManager, Platform, StatusBar } from 'react-native'
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { useScale } from '../../../hooks/useScale';
import { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const ObjectMatchingGame = ({ lineStartX, lineStartY, lineEndX, lineEndY, setLines, setSelectedImage, setFullImage, content, setChosenOptions, passed, play, stop, isPlaying, playingIndex, setPlayingIndex, }) => {

    const { s, vs, windowWidth, isTablet } = useScale()

    const options = Object.values(content || {});

    const images1 = useMemo(() => {
      return options
            .map((opt) => opt?.img?.[0] ? { key: opt?.key, uri: opt?.img[0], audio: Array.isArray(opt?.audio) ? opt.audio[0] || null : null } : null)
            .filter(Boolean)
            .sort(() => Math.random() - 0.5);
    }, [content]);
    
    const images2 = useMemo(() => {
        return options
            .map((opt) => opt?.img?.[1] ? { key: opt?.key, uri: opt?.img[1], audio: Array.isArray(opt?.audio) ? opt.audio[0] || null : null } : null)
            .filter(Boolean)
            .sort(() => Math.random() - 0.5);
    },  [content]);

    const [centers, setCenters] = useState([]);
    const [bottomCenters, setBottomCenters] = useState([]); 

    const paddingVertical = isTablet ? vs(25) : vs(30);
    const paddingHorizontal = isTablet? (s(10)) : vs(100);

    const bottomRefs = useRef([]);

    const columnGap = s(13);
    const rowGap = vs(35);

    const contSize = ((windowWidth - (isTablet ? s(20) : s(30))) * 0.82) - vs(50)
    const contHeight = vs(420);

    const effectiveBorder = vs(1);
    const numColumns = 4;
    const totalGaps = columnGap * (numColumns - 1);
    const totalBorders = effectiveBorder * 2 * numColumns;

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns;

    const numRows = 2;
    const totalRowGaps = rowGap * (numRows - 1);
    const totalRowBorders = effectiveBorder * 2 * numRows;

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows;

    const cellSize = Math.min(cellWidth, cellHeight);

    const addCurvedLine = (data: { x1: any; y1: any; x2: any; y2: any; fromKey: any; toKey: any; }) => {
        setLines((prev: any[]) => {
            const filtered = prev.filter(
            (line: { x1: any; y1: any; x2: any; y2: any; }) =>
                !(
                (line.x1 === data.x1 && line.y1 === data.y1) ||
                (line.x2 === data.x2 && line.y2 === data.y2)
                )
            );

            setChosenOptions((prev: Array<{ fromKey: string; toKey: string }>) => {
                const filtered = prev.filter(
                    (item) => item.fromKey !== data.fromKey && item.toKey !== data.toKey
                );
                return [...filtered, { fromKey: data.fromKey, toKey: data.toKey }];
            });
        
            return [...filtered, data];
        });
        
        removeLine();
    };
     
    const checkIfMatched = (absX: any, absY: any, lineStartX: { value: any; }, lineStartY: { value: any; }, bottomCenters: string | any[], addCurvedLine: (arg0: { x1: any; y1: any; x2: any; y2: any; color: string; }) => void, fromKey: any) => {
        for (let i = 0; i < bottomCenters.length; i++) {
            const center = bottomCenters[i];
            if (center && isWithin(absX, absY, center.centerX, center.centerY)) {
        
            const toKey = center?.key ?? 'unknown';
        
            addCurvedLine({
                x1: lineStartX.value,
                y1: lineStartY.value,
                x2: center.centerX,
                y2: center.centerY,
                color: "#504297",
                fromKey: fromKey,
                toKey: toKey
            });
        
            return;
            }
        }
    
        removeLine();
    };

    const removeLine = () => {
        lineStartX.value = 0;
        lineStartY.value = 0;
        lineEndX.value = 0;
        lineEndY.value = 0;
    };

    const isWithin = (x: number, y: number, cx: number, cy: number, size = 50) => {
        return Math.abs(x - cx) < size && Math.abs(y - cy) < size;
    };

    const measureCenter = (ref: any, callback: (centerX: number, centerY: number) => void) => {
        InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                ref?.measureInWindow((x: number, y: number, width: number, height: number) => {
                    const centerX = x + width / 2;
                    const offsetY = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
                    const centerY = y + height / 2 + offsetY;
                    callback(centerX, centerY);
                });
            });
        });
    };

    const createPanGesture = (index: number) => {
        const fromKey = centers[index]?.key ?? 'unknown'
        return Gesture.Pan()
            .onBegin(() => {
                if (passed === 1) return
                const center = centers[index];
                if (center) {
                lineStartX.value = center.centerX - paddingHorizontal;
                lineStartY.value = center.centerY - paddingVertical;
                lineEndX.value = center.centerX - paddingHorizontal;
                lineEndY.value = center.centerY - paddingVertical;
                }
            })
            .onUpdate((event) => {
                if (passed === 1) return
                lineEndX.value = event.absoluteX - paddingHorizontal;
                lineEndY.value = event.absoluteY - paddingVertical;
            })
            .onEnd((event) => {
                if (passed === 1) return
                runOnJS(checkIfMatched)(
                event.absoluteX - paddingHorizontal,
                event.absoluteY - paddingVertical,
                lineStartX,
                lineStartY,
                bottomCenters,
                addCurvedLine,
                fromKey
                );
        });
    };

    const measure = useCallback((el: any, index: string | number) => {
        const img = images1[index];
        measureCenter(el, (centerX, centerY) => {
            setCenters((prev) => {
                const prevItem = prev[index];
                const same =
                    prevItem &&
                    Math.abs(prevItem.centerX - centerX) < 0.5 &&
                    Math.abs(prevItem.centerY - centerY) < 0.5;
            
                if (same) return prev;
        
                return {
                    ...prev,
                    [index]: {
                    centerX,
                    centerY,
                    key: img?.key, // добавляем key
                    },
                };
            });
        });
    }, [images1]);
    
    const gestures = useMemo(() => {
        return images1.map((_, index) => createPanGesture(index));
    }, [centers, bottomCenters]);

    useEffect(() => {
      if (passed === 1) {
        const correctLines = [];
    
        images1.forEach((img1, index1) => {
            const matchingImg2 = images2.find((img2) => img2.key === img1.key);
            const index2 = images2.indexOf(matchingImg2);
            const center1 = centers[index1];
            const center2 = bottomCenters[index2];
        
            if (center1 && center2) {
                correctLines.push({
                x1: center1.centerX - paddingHorizontal,
                y1: center1.centerY - paddingVertical,
                x2: center2.centerX,
                y2: center2.centerY,
                fromKey: img1.key,
                toKey: img1.key,
                });
            }
        });
    
        setLines(correctLines);
    
        setChosenOptions(correctLines.map(({ fromKey, toKey }) => ({ fromKey, toKey })));
      }
    }, [passed, centers, bottomCenters]);

    return (
        <View style={{width: contSize, height: 'auto', flexDirection: 'row', rowGap: rowGap, columnGap: columnGap, flexWrap: 'wrap'}}>
            {images1?.map((img, index) => {
                return (
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
                                source={img?.uri}
                                style={{
                                    width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                                }}
                                contentFit="contain"
                                transition={0}
                                cachePolicy='disk'
                            />

                                {img?.audio && <Ionicons onPress={() => { 
                                    if (playingIndex === index && isPlaying) { 
                                        stop(); 
                                        setPlayingIndex(null);
                                    } else if (playingIndex === index && !isPlaying) {
                                        play(img?.audio);
                                    } else {
                                        play(img?.audio);
                                        setPlayingIndex(index);
                                    }
                                }}  size={vs(45)} name={playingIndex === index && isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} color={'green'} style={{position: 'absolute', right: 3, top: 3 }} />}

                            <Ionicons onPress={() => {
                                setSelectedImage(img);
                                setFullImage(true);
                            }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                        </View>
                    </GestureDetector>
                )})}

            {images2?.map((img, index) => {
                return (
                    <View
                        key={index}
                        ref={(el) => (bottomRefs.current[index] = el)}
                        onLayout={() =>
                            measureCenter(bottomRefs.current[index], (centerX, centerY) => {
                                setBottomCenters((prev) => {
                                    const prevItem = prev[index];
                                    const same =
                                        prevItem &&
                                        Math.abs(prevItem.centerX - (centerX - paddingHorizontal)) < 0.5 &&
                                        Math.abs(prevItem.centerY - (centerY - paddingVertical)) < 0.5;
                        
                                    if (same) return prev;
                        
                                    const updated = [...prev];
                                    updated[index] = {
                                        centerX: centerX - paddingHorizontal,
                                        centerY: centerY - paddingVertical,
                                        key: img?.key, // ← здесь img доступен, всё ок
                                    };
                                    return updated;
                                });
                        })}              
                        style={{
                            width: cellWidth,
                            height: cellHeight,
                            borderWidth: 2,
                            borderColor: '#EFEEFC',
                            borderRadius: 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={img?.uri}
                            style={{
                                width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                            }}
                            contentFit="contain"
                            transition={0}
                            cachePolicy='disk'
                        />

                        <Ionicons onPress={() => {setSelectedImage(img); setFullImage(true);}}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                    </View>
                )})}
        </View>
    )
}

export default ObjectMatchingGame;