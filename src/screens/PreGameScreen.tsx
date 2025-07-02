import { ImageBackground, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { useScale } from '../hooks/useScale'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import MonthTopics from './PreGame/MonthTopics'
import GamePreview from './PreGame/GamePreview'
import { useFocusEffect } from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'

const PreGameScreen = ({ route }) => {

    const { s, vs } = useScale()

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            }
            changeScreenOrientation();
        }, [])
    );

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <ScrollView contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <GamePreview id={route?.params?.id} name={route?.params?.name} topic={route?.params?.topic} />

                <MonthTopics />
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(PreGameScreen);
