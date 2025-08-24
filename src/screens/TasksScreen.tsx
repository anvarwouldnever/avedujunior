import { Text, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import TasksList from './Tasks/TasksList'
import useLock from '../hooks/useLock'
import translations from '../../translations'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'

const TasksScreen = ({ route }) => {

    const { s, vs } = useScale()

    const name = route?.params?.name

    useLock()

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView style={{flex: 1, padding: vs(20)}}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>{translations[store.language].предмет}: {name}</Text>
                <TasksList route={route}/>
            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>

        </ImageBackground>
    )
}

export default observer(TasksScreen);