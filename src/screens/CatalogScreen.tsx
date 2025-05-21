import { View, Text, ScrollView, ImageBackground, Platform, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import Animated, { LinearTransition } from 'react-native-reanimated'
import Subjects from './Catalog/Subjects'
import SubjectTable from './Catalog/SubjectTable'

const CatalogScreen = () => {

    const { vs } = useScale()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null)

    const materials = [
        {
            title: 'Рисование', topicsAmount: '1 тема', 
            icon: require('../screens/Catalog/staticAssets/static1.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски', backgroundColor: '#CAFFE6'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски', backgroundColor: '#CAFFE6'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски', backgroundColor: '#CAFFE6'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}]
        },
        {
            title: 'Конструирование', topicsAmount: '5 тем', 
            icon: require('../screens/Catalog/staticAssets/static2.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски', backgroundColor: '#CAFFE6'}, {name: 'Прописи'}]}]},
        {
            title: 'Аппликация', topicsAmount: '6 тем', 
            icon: require('../screens/Catalog/staticAssets/static3.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]},
        {
            title: 'Лепка', topicsAmount: '2 темы', 
            icon: require('../screens/Catalog/staticAssets/static4.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]},
        {
            title: 'Окружающий нас мир', topicsAmount: '3 темы', 
            icon: require('../screens/Catalog/staticAssets/static5.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]},
        {
            title: 'Развитие речи', topicsAmount: '4 темы', 
            icon: require('../screens/Catalog/staticAssets/static6.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]}, 
        {
            title: 'Основы науки и естествознания', topicsAmount: '5 тем', 
            icon: require('../screens/Catalog/staticAssets/static7.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]}, 
        {
            title: 'Обучение грамоте', topicsAmount: '3 темы', 
            icon: require('../screens/Catalog/staticAssets/static8.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
                tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]},
        {
            title: 'Английский язык', topicsAmount: '7 тем', 
            icon: require('../screens/Catalog/staticAssets/static1.jpg'), 
            topics: [{id: 1, name: 'Основы науки и естествознания', 
            tags: [{name: 'Конспект', backgroundColor: '#CADFFF'}, {name: 'Раскраски'}, {name: 'Прописи', backgroundColor: '#EECAFF'}]}, {id: 2, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}, {id: 3, name: 'Основы науки и естествознания', tags: [{name: 'Конспект'}, {name: 'Раскраски'}, {name: 'Прописи'}]}]}
    ]

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
        <Animated.ScrollView layout={LinearTransition.duration(1000)} style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground style={{ flex: 1, padding: Platform.isPad ? vs(20) : vs(20), justifyContent: 'center'}} source={require('../../assets/aveduBackground.png')}>
                <Text style={{color: 'black', fontSize: vs(22), fontWeight: '700', marginVertical: vs(20)}}>{getMonthYear()}</Text>
                <Subjects selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} materials={materials}/>

                <SubjectTable selectedIndex={selectedIndex} materials={materials} setExpandedTopicId={setExpandedTopicId} expandedTopicId={expandedTopicId}/>
            </ImageBackground>
        </Animated.ScrollView>
    )
}

export default CatalogScreen;