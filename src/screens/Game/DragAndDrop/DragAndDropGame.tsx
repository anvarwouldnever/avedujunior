import { Platform, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { images1 } from '../staticAssets/Images'
import { useScale } from '../../../hooks/useScale'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

const AnimatedImage = Animated.createAnimatedComponent(Image)

type Cell = { index: number, img: any | null }

const DragAndDropGame = ({ setSelectedImage, setFullImage }) => {
    const { s, vs, windowWidth } = useScale()
    const dropZones = useRef<View[]>([])

    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

    const columnGap = s(13);
    const rowGap = vs(35);

    const contSize = ((windowWidth - (Platform.isPad ? s(20) : s(30))) * 0.82) - vs(50);
    const contHeight = vs(420);

    const effectiveBorder = vs(1)
    const numColumns = 4
    const totalGaps = columnGap * (numColumns - 1)
    const totalBorders = effectiveBorder * 2 * numColumns

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns

    const numRows = 2
    const totalRowGaps = rowGap * (numRows - 1)
    const totalRowBorders = effectiveBorder * 2 * numRows

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows;

    const cellSize = Math.min(cellWidth, cellHeight);

    const [topRow, setTopRow] = useState<Cell[]>(images1.map((img, i) => ({ index: i, img })));
    const [bottomRow, setBottomRow] = useState<Cell[]>(Array(4).fill(null).map((_, i) => ({ index: i, img: null })));

    const draggingKey = useSharedValue<string | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const checkIntersection = (xPos: number, yPos: number) => {
        const measurements = dropZones.current.map(
          (ref, index) =>
            new Promise<{ index: number; inside: boolean }>((resolve) => {
              if (!ref) {
                resolve({ index, inside: false })
                return
              }
              ref.measure((x, y, width, height, pageX, pageY) => {
                const inHorizontal = xPos >= pageX && xPos <= pageX + width
                const inVertical = yPos >= pageY && yPos <= pageY + height
                resolve({ index, inside: inHorizontal && inVertical })
              })
            })
        )
      
        Promise.all(measurements).then(results => {
          const foundZone = results.find(r => r.inside)
          if (foundZone) {
            runOnJS(setHighlightedIndex)(foundZone.index)
          } else {
            runOnJS(setHighlightedIndex)(null)
          }
        })
    }

    const getDropTargetIndex = async (
        xPos: number,
        yPos: number,
        draggedIndex: number,
        draggedFromTop: boolean
    ): Promise<void> => {
        for (let i = 0; i < dropZones.current.length; i++) {
        const ref = dropZones.current[i]
        if (!ref) continue

        const isInside = await new Promise<boolean>((resolve) => {
            ref.measure((x, y, width, height, pageX, pageY) => {
                const inHorizontal = xPos >= pageX && xPos <= pageX + width
                const inVertical = yPos >= pageY && yPos <= pageY + height
                resolve(inHorizontal && inVertical)
            })
        })

        if (isInside) {
            const fromTop = draggedFromTop
            const toTop = i < 4

            const fromIndex = draggedIndex
            const toIndex = i % 4

            const newTop = [...topRow]
            const newBottom = [...bottomRow]

            const fromRow = fromTop ? newTop : newBottom
            const toRow = toTop ? newTop : newBottom

            // Меняем местами
            const draggedItem = fromRow[fromIndex]
            const targetItem = toRow[toIndex]

            fromRow[fromIndex] = { ...fromRow[fromIndex], img: targetItem.img }
            toRow[toIndex] = { ...toRow[toIndex], img: draggedItem.img }

            setTopRow(newTop)
            setBottomRow(newBottom)

            break
        }
        }

        runOnJS(setHighlightedIndex)(null)
    }

    const renderCell = (row: 'top' | 'bottom', obj: Cell, index: number) => {
        const isTop = row === 'top'
        const zoneIndex = isTop ? index : index + 4

        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);    

        const gesture = Gesture.Pan()
        .onBegin(() => {
            draggingKey.value = `${row}-${index}`;
            runOnJS(setDraggingId)(`${row}-${index}`);
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
            runOnJS(checkIntersection)(event.absoluteX, event.absoluteY);
        })
        .onEnd((event) => {
            draggingKey.value = null;
            runOnJS(setDraggingId)(null);
            runOnJS(getDropTargetIndex)(event.absoluteX, event.absoluteY, index, isTop);
            translateX.value = withDelay(15, withTiming(0));
            translateY.value = withDelay(15, withTiming(0));
        })

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { translateX: translateX.value },
              { translateY: translateY.value }
            ],
            zIndex: draggingKey.value === `${row}-${index}` ? 100 : 0,
    }))   

    const isHighlighted = highlightedIndex === zoneIndex;

    return (
      <GestureDetector key={`${row}-${index}`} gesture={gesture}>
        <View
          ref={(ref) => (dropZones.current[zoneIndex] = ref!)}
          style={{
            width: cellWidth,
            height: cellHeight,
            backgroundColor: isHighlighted ? '#EEFCF4' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#EFEEFC',
            borderRadius: 12,
            zIndex: draggingId === `${row}-${index}` ? 1000 : 0,
          }}
        >
          {obj?.img && (
          <>
            <AnimatedImage
              source={obj.img}
              style={[{ width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white' }, animatedStyle]}
              contentFit={'contain'}
              transition={0}
              cachePolicy={'disk'}
            />
            <Ionicons
              onPress={() => {
                setSelectedImage(obj.img);
                setFullImage(true);
              }}
              size={vs(45)}
              name='search-circle-outline'
              color={'#FFD600'}
              style={{ position: 'absolute', left: 2, top: 2, zIndex: 100 }}
            />
          </>
        )}
        </View>
      </GestureDetector>
    )
    }

    return (
        <View style={{
            width: contSize,
            height: contHeight,
            flexDirection: 'row',
            rowGap: rowGap,
            flexWrap: 'wrap',
            columnGap: columnGap,
        }}>
            {topRow.map((obj, index) => renderCell('top', obj, index))}
            {bottomRow.map((obj, index) => renderCell('bottom', obj, index))}
        </View>
    )
}

export default DragAndDropGame
