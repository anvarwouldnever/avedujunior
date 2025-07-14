import { ImageBackground, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { useScale } from '../hooks/useScale'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import MonthTopics from './PreGame/MonthTopics'
import GamePreview from './PreGame/GamePreview'
import useLock from '../hooks/useLock'

const PreGameScreen = ({ route }) => {

    const { vs } = useScale();

    const id = route?.params?.id
    const name = route?.params?.name
    const topic = route?.params?.topic
    const tasksId = route?.params?.tasksId

    useLock();

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <GamePreview tasksId={tasksId} id={id} name={name} topic={topic} />

                <MonthTopics />
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(PreGameScreen);
