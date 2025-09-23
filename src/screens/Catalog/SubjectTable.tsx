import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { getSubjectDocs } from './hooks/getSubjectDocs'
import * as Linking from 'expo-linking';
import translations from '../../../translations'
import { store } from '../../store/store'
import NotFoundKid from '../../components/NotFoundKid'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const SubjectTable = ({ selectedId, expandedTopicId, setExpandedTopicId, name }) => {

    const toggleTopic = (id: number) => {
        setExpandedTopicId(prev => (prev === id ? null : id))
    }

    const { s, vs, isTablet } = useScale();

    const { subjectDocs, error, loading } = getSubjectDocs(selectedId)

    const openPdf = (url) => {
        if (url) {
            Linking.openURL(url);
        } else {
            console.warn('URL пустой или недоступен');
        }
    };

    return (
        <View style={{ width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: vs(20), marginBottom: vs(20), borderWidth: 2, borderColor: '#EFEEFC', }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: isTablet? vs(18) : vs(16), fontWeight: '600'}}>{name}</Text>
            <View style={{width: '100%', backgroundColor: '#EFEEFC', height: vs(2), borderRadius: 20, marginVertical: vs(20)}}/>
            <Text style={{color: '#65628B', marginBottom: vs(20), fontSize: isTablet? vs(16) : vs(14)}}>№ {store.labels?.topic || translations[store.language].тема}</Text>
            
            {subjectDocs && subjectDocs.length > 0 ? 
                <View style={{ height: 'auto', width: '100%', gap: vs(12) }}>
                    {subjectDocs?.map((topic, index) => {
                        const isExpanded = expandedTopicId === index
                        
                        const pdfTagMap = [
                            { key: 'pdf', name: store.labels?.summary || translations[store.language].конспект, color: '#CADFFF' },
                            { key: 'pdf_2', name: store.labels?.copybooks ||  translations[store.language].прописи, color: '#CAFFE6' },
                            { key: 'pdf_3', name: 'Доп. материал', color: '#FFD5D5' },
                            { key: 'pdf_4', name: store.labels?.coloringPages ||  translations[store.language].раскраски, color: '#CAFFE6' },
                            { key: 'pdf_5', name: store.labels?.model3d ||  `3D ${translations[store.language].модели}`, color: '#EECAFF' },
                        ];

                        const tagsFromPdf = pdfTagMap .filter(({ key }) => topic?.[key]).map(({ name, color }) => ({ name, backgroundColor: color }));

                        return (
                            <AnimatedTouchableOpacity activeOpacity={1} onPress={() => toggleTopic(index)} layout={LinearTransition.duration(200)} key={index} style={{ width: '100%', minHeight: isTablet? vs(80) : vs(80), height: 'auto', borderRadius: vs(20), borderWidth: 2, borderColor: '#EFEEFC', padding: vs(15), flexDirection: 'column', rowGap: vs(15) }}>
                                
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    
                                    <View style={{ rowGap: vs(10), width: '95%' }}>
                                        
                                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: vs(10)}}>
                                            
                                            <Text style={{ fontWeight: '600', fontSize: isTablet? vs(16) : vs(14) }}>{index + 1}</Text>
                                            
                                            <Text numberOfLines={2} style={{ fontWeight: '600', fontSize: isTablet? vs(16) : vs(14), width: '90%' }}>{topic?.theme}</Text>
                                        
                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            
                                            <View style={{gap: vs(8), flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                            
                                                {tagsFromPdf.slice(0, 2).map((tag, index) => {
                                                    return (
                                                        <View style={{ width: 'auto', height: 'auto', paddingHorizontal: vs(15), paddingVertical: vs(5), borderRadius: 7, backgroundColor: tag.backgroundColor }} key={index}>
                                                            <Text style={{ fontSize: vs(12), textAlign: 'center' }}>{tag?.name}</Text>
                                                        </View>
                                                    ) 
                                                })}

                                            </View>

                                        </View>

                                    </View>

                                    <TouchableOpacity onPress={() => toggleTopic(index)} style={{width: 'auto', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                                            
                                        <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={vs(22)}/>
                                        
                                    </TouchableOpacity>

                                </View>
                                
                                {isExpanded && (
                                    <View style={{ flexDirection: 'column', gap: vs(15), width: '100%' }}>
                                    
                                        {pdfTagMap.filter(({ key }) => topic?.[key]).map(({ key, name }, pdfIndex) => {
                                        
                                            return (
                                                <Animated.View entering={FadeIn.duration(500)} style={{ flexDirection: 'row', alignItems: 'center', width: isTablet? '20%' : '100%', justifyContent: 'space-between' }} key={key}>
                                                
                                                    <Text style={{ fontSize: vs(14), fontWeight: '600', color: '#333', width: '50%' }}>{name}:</Text>
                                                    
                                                    <TouchableOpacity onPress={() => openPdf(topic[key])} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEEFC', borderRadius: 12, }}>
                                                        
                                                        <Text style={{color: '#6A5AE0', fontWeight: '700', margin: vs(10), fontSize: vs(12)}}>{store.labels?.download || translations[store?.language].скачать}</Text>
                                                    
                                                    </TouchableOpacity>

                                                </Animated.View>
                                            )
                                        })}

                                    </View>
                                )}

                            </AnimatedTouchableOpacity>
                        )
                    })}
                </View>
            :
                <NotFoundKid text={`Нет материалов для предмета ${name}`} />
            }
        </View>
    )
}

export default SubjectTable;