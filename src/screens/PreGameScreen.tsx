import { ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { useScale } from '../hooks/useScale'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import MonthTopics from './PreGame/MonthTopics'
import GamePreview from './PreGame/GamePreview'

const PreGameScreen = () => {

    const { s, vs } = useScale()

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <ScrollView contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <GamePreview />

                <MonthTopics />
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(PreGameScreen);