import { Text, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import Subjects from './Catalog/Subjects'
import SubjectTable from './Catalog/SubjectTable'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { getSubjects } from './Home/SubjectsGrid/hooks/getSubjects'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'

const CatalogScreen = () => {

    const { s, vs, isTablet } = useScale()
    const [selectedId, setSelectedId] = useState<number | null>(1)
    const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null)

    const { subjects, error, loading } = getSubjects()

    const name = subjects.find(subject => subject?.id === selectedId)?.name

    const getMonthYear = () => {
        const date = new Date()
        const months = [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ]
        const month = months[date.getMonth()]
        const year = date.getFullYear()
    
        return `${month} ${year}`.replace(/^./, str => str.toUpperCase())
    }

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                
                <Text style={{color: 'black', fontSize: isTablet ? vs(22) : vs(22), fontWeight: '700'}}>{getMonthYear()}</Text>
                
                <Subjects selectedId={selectedId} setSelectedId={setSelectedId} subjects={subjects}/>

                <SubjectTable name={name} selectedId={selectedId} setExpandedTopicId={setExpandedTopicId} expandedTopicId={expandedTopicId}/>
            
            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>

        </ImageBackground>
    )
}

export default observer(CatalogScreen);