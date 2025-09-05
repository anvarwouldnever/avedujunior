import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useScale } from '../../../hooks/useScale'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const SimpleGame = ({ setSelectedImage, setFullImage, content, play, stop, isPlaying, playingIndex, setPlayingIndex, gameType, chosenOptions, setChosenOptions, passed, answers }) => {

    const { s, vs, windowWidth, isTablet } = useScale();

    const columnGap = s(10);
    const rowGap = vs(35);

    const images = useMemo(() => {
        return content ? Object.values(content).slice().sort(() => Math.random() - 0.5) : [];
    }, [content]);

    const contSize = ((windowWidth - (isTablet? s(20) : s(30))) * 0.82) - vs(50);
    const contHeight = s(90);

    const effectiveBorder = vs(1);
    const numColumns = 4;
    const totalGaps = columnGap * (numColumns - 1);
    const totalBorders = effectiveBorder * 2 * numColumns;

    const cellWidth = (contSize - totalGaps - totalBorders) / numColumns;
    const numRows = 1.5;
    const totalRowGaps = rowGap * (numRows - 1);
    const totalRowBorders = effectiveBorder * 2 * numRows;

    const cellHeight = (contHeight - totalRowGaps - totalRowBorders) / numRows;
    const cellSize = Math.min(cellWidth, cellHeight);

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
            {images?.map((option, index) => {

                return (
                    <AnimatedTouchableOpacity entering={FadeIn.duration(300)} key={option?.img} onPress={passed === 1 ? () => {return} : () => handlePress(option?.key)} style={{ width: cellWidth, height: cellHeight, borderWidth: 2, borderColor: passed === 1 && answers.includes(option?.key) ? '#30AB02' : isSelected(option?.key) ? '#FFD600' : '#EFEEFC', borderRadius: 12, overflow: 'visible', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={option?.img}
                            style={{
                                width: cellWidth * 0.8, height: cellSize - 20, backgroundColor: 'white'
                            }}
                            contentFit="contain"
                            transition={0}
                            cachePolicy="disk"
                        />
                        {option?.audio && <Ionicons onPress={() => { 
                            if (playingIndex === index && isPlaying) { 
                                stop(); 
                                setPlayingIndex(null);
                            } else if (playingIndex === index && !isPlaying) {
                                play(option?.audio);
                            } else {
                                play(option?.audio);
                                setPlayingIndex(index);
                            }
                        }}  size={vs(45)} name={playingIndex === index && isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} color={'green'} style={{position: 'absolute', right: 3, top: 3 }} />}
                        <Ionicons onPress={() => {
                            setSelectedImage(option?.img);
                            setFullImage(true);
                        }}  size={vs(45)} name='search-circle-outline' color={'#FFD600'} style={{position: 'absolute', left: 3, top: 3 }} />
                        <Text adjustsFontSizeToFit numberOfLines={1} style={{position: 'absolute', bottom: -s(10), fontSize: s(5), fontWeight: '600', width: cellWidth, textAlign: 'center'}}>{option?.text}</Text>
                        {passed === 1 && answers.includes(option?.key) && <Text adjustsFontSizeToFit numberOfLines={1} style={{position: 'absolute', top: -s(10), fontSize: s(5), fontWeight: '600', width: cellWidth, textAlign: 'center', color: '#30AB02'}}>Твой ответ!</Text>}
                    </AnimatedTouchableOpacity>
                )}
            )}
        </View>
    )
}

export default SimpleGame;