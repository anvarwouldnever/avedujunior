import { View, Text, ScrollView, ImageBackground, Platform, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import Subjects from './Catalog/Subjects'
import SubjectTable from './Catalog/SubjectTable'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { getSubjects } from './Home/SubjectsGrid/hooks/getSubjects'

const CatalogScreen = () => {

    const { s, vs } = useScale()
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
            <ScrollView style={{flex: 1,  padding: Platform.isPad ? vs(20) : vs(20)}}>
                <Text style={{color: 'black', fontSize: Platform.isPad ? vs(22) : s(22), fontWeight: '700', marginVertical: vs(20)}}>{getMonthYear()}</Text>
                <Subjects selectedId={selectedId} setSelectedId={setSelectedId} subjects={subjects}/>

                <SubjectTable name={name} selectedId={selectedId} setExpandedTopicId={setExpandedTopicId} expandedTopicId={expandedTopicId}/>
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(CatalogScreen);