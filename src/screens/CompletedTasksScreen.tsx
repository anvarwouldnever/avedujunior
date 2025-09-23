import { ImageBackground, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { store } from '../store/store'
import { bgAssets } from '../components/BgAssets'
import { useScale } from '../hooks/useScale'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'
import { observer } from 'mobx-react-lite'
import translations from '../../translations'
import Subjects from './CompletedTasks/Subjects'
import { getSubjects } from './Home/SubjectsGrid/hooks/getSubjects'
import TasksList from './CompletedTasks/TasksList'
import useLock from '../hooks/useLock'


const CompletedTasksScreen = () => {

    const { s, vs, isTablet } = useScale()

    useLock()

    const { subjects, error, loading } = getSubjects();

    const [selectedSubject, setSelectedSubject] = useState<number | null>(0);

    const id = subjects[selectedSubject].id;
    const name = subjects[selectedSubject].name;

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{ flex: 1, padding: vs(20) }}>
                
                <Text style={{color: 'black', fontSize: isTablet ? vs(22) : vs(22), fontWeight: '700'}}>{store?.labels?.subjects || translations[store.language]?.предметы}</Text>
                
                <Subjects selectedId={selectedSubject} setSelectedId={setSelectedSubject} subjects={subjects} />

                <TasksList id={id} name={name} />

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>

        </ImageBackground>
    )
}

export default observer(CompletedTasksScreen);