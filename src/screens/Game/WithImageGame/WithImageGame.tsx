import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../../hooks/useScale'
import { images1, images2 } from '../staticAssets/Images'
import { Image } from 'expo-image'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'

const WithImageGame = ({ setSelectedImage, setFullImage }) => {

    const { s, vs, windowWidth, windowHeight } = useScale()

    const columnGap = s(13)
    const rowGap = vs(35)

    const contSize = ((windowWidth - (Platform.isPad ? s(20) : s(30))) * 0.82) - vs(50)
    const contHeight = vs(420)

    const effectiveBorder = vs(1)
    const numColumns = 4
    const totalGaps = columnGap * (numColumns - 1)
    const totalBorders = effectiveBorder * 2 * numColumns

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns

    const numRows = 2
    const totalRowGaps = rowGap * (numRows - 1)
    const totalRowBorders = effectiveBorder * 2 * numRows

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows

    const cellSize = Math.min(cellWidth, cellHeight)

    const [chosenOptions, setChosenOptions] = useState([])
    
    const handlePress = (type, index) => {
        const key = `${type}-${index}`;
        setChosenOptions(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };
    
    const isSelected = (type, index) => chosenOptions.includes(`${type}-${index}`);

    return (
        <View style={{width: contSize, height: contHeight, flexDirection: 'column', rowGap: rowGap, columnGap: columnGap}}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                {images2.slice(0, 1).map((img, index) => (
                    <TouchableOpacity key={`img2-${index}`} onPress={() => handlePress('img2', index)} style={{ width: cellWidth, height: cellHeight, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={img}
                            style={{
                                width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                            }}
                            contentFit="contain"
                            transition={0}
                            cachePolicy="disk"
                        />
                        <Ionicons onPress={() => {
                            setSelectedImage(img);
                            setFullImage(true);
                        }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                {images1.map((img, index) => (
                    <TouchableOpacity key={`img1-${index}`} onPress={() => handlePress('img1', index)} style={{ width: cellWidth, height: cellHeight, borderWidth: 2, borderColor: isSelected('img1', index) ? '#FFD600' : '#EFEEFC', borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
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
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default WithImageGame;