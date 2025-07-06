import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useMemo } from 'react'
import { useScale } from '../../../hooks/useScale'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

const WithImageGame = ({ setSelectedImage, setFullImage, questionImage, content, gameType, chosenOptions, setChosenOptions, play, stop, isPlaying, playingIndex, setPlayingIndex }) => {

    const { s, vs, windowWidth } = useScale()

    const images = useMemo(() => {
        return content ? Object.values(content).slice().sort(() => Math.random() - 0.5) : [];
    }, [content]);

    // console.log(images)

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
        <View style={{width: contSize, height: contHeight, flexDirection: 'column', rowGap: rowGap, columnGap: columnGap}}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                <TouchableOpacity style={{ width: cellWidth - 20, height: cellHeight - 20, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: questionImage }}
                        style={{
                            width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                        }}
                        contentFit="contain"
                        transition={0}
                        cachePolicy="disk"
                    />
                    <Ionicons onPress={() => {
                        setSelectedImage(questionImage);
                        setFullImage(true);
                    }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                {images?.map((img, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePress(img?.key)} style={{ width: cellWidth, height: cellHeight, borderWidth: 2, borderColor: isSelected(img.key) ? '#FFD600' : '#EFEEFC', borderRadius: 12, overflow: 'visible', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={img?.img}
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
                            setSelectedImage(img?.img);
                            setFullImage(true); 
                        }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 2, top: 2, }} />
                        <Text adjustsFontSizeToFit numberOfLines={1} style={{position: 'absolute', bottom: -s(10), fontSize: s(5), fontWeight: '600', width: cellWidth, textAlign: 'center'}}>{img?.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default WithImageGame;