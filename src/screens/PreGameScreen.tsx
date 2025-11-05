import { ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import MonthTopics from './PreGame/MonthTopics'
import GamePreview from './PreGame/GamePreview'
import useLock from '../hooks/useLock'
import { getPreGame } from './PreGame/hooks/getPreGame'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'
import Back from './PreGame/Back'

const PreGameScreen = ({ route }) => {

    useLock();

    const { vs } = useScale();

    const defaultId = route?.params?.id;
    const defaultTopic = route?.params?.topic;
    
    const name = route?.params?.name;
    const tasksId = route?.params?.tasksId;

    const [id, setId] = useState(defaultId);
    const [topic, setTopic] = useState(defaultTopic);

    const { preGame, error, loading } = getPreGame(id)

    const changeTopic = (newId: any) => {
        const selectedTopic = preGame?.days?.find((day) => day.id === newId);
        if (selectedTopic) {
            setId(newId);
            setTopic(selectedTopic.theme); 
        }
    };

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(15), flexGrow: 1 }} style={{ padding: vs(20) }}>
                
                <Back tasksId={tasksId} name={name} />
                
                <GamePreview preGame={preGame?.data} tasksId={tasksId} id={id} name={name} topic={topic} />

                <MonthTopics id={id} changeTopic={changeTopic} name={name} days={preGame?.days} />

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default observer(PreGameScreen);
