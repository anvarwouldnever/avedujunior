import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../../hooks/useScale'
import { images1, images2 } from '../staticAssets/Images'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { useAudio } from '../../../hooks/useAudio'

const SimpleGame = ({ setSelectedImage, setFullImage, content, play, stop, isPlaying, playingIndex, setPlayingIndex, gameType }) => {

    const { s, vs, windowWidth, windowHeight } = useScale()

    const columnGap = s(10)
    const rowGap = vs(35)

    const contSize = ((windowWidth - (Platform.isPad ? s(20) : s(30))) * 0.82) - vs(50)
    const contHeight = s(90)

    const effectiveBorder = vs(1);
    const numColumns = 4;
    const totalGaps = columnGap * (numColumns - 1)
    const totalBorders = effectiveBorder * 2 * numColumns

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns;

    const numRows = 1.5;
    const totalRowGaps = rowGap * (numRows - 1);
    const totalRowBorders = effectiveBorder * 2 * numRows;

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows;

    const cellSize = Math.min(cellWidth, cellHeight)

    const [chosenOptions, setChosenOptions] = useState([])

    const handlePress = (key) => {
        setChosenOptions((prev) => {
            if (gameType === 1) {
                return prev.includes(key) ? [] : [key];
            } else if (gameType === 2) {
                return prev.includes(key)
                    ? prev.filter(k => k !== key)
                    : [...prev, key];
            } else {
                return
            }
        });
    };    
    
    const isSelected = (key) => chosenOptions.includes(key);

    return (
        <View style={{width: contSize, height: contHeight, flexDirection: 'row', rowGap: rowGap, columnGap: columnGap, alignItems: 'center'}}>
            {content && Object?.values(content)?.map((option, index) => {

                return (
                    <TouchableOpacity key={option?.key} onPress={() => handlePress(option?.key)} style={{ width: cellWidth, height: cellHeight, borderWidth: 2, borderColor: isSelected(option.key) ? '#FFD600' : '#EFEEFC', borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={option?.img}
                            style={{
                                width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                            }}
                            contentFit="contain"
                            transition={0}
                            cachePolicy="disk"
                        />

                        <Ionicons onPress={() => { 
                            if (playingIndex === index) { 
                                stop(); 
                                setPlayingIndex(null);
                            } else {
                                play(option.audio);
                                setPlayingIndex(index);
                            }
                        }}  size={vs(45)} name={playingIndex === index && isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} color={'green'} style={{position: 'absolute', right: 3, top: 3 }} />
                        
                        <Ionicons onPress={() => {
                            setSelectedImage(option?.img);
                            setFullImage(true);
                        }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 3, top: 3 }} />
                    </TouchableOpacity>
                )}
            )}
        </View>
    )
}

export default SimpleGame;