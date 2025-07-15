import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import Animated, { LinearTransition } from 'react-native-reanimated'

const SubjectTable = ({ selectedIndex, materials, expandedTopicId, setExpandedTopicId }) => {

    const toggleTopic = (id: number) => {
        setExpandedTopicId(prev => (prev === id ? null : id))
    }

    const { s, vs } = useScale();

    return (
        <View style={{ width: '100%', backgroundColor: 'white', height: 'auto', marginTop: vs(20), borderRadius: vs(20), paddingVertical: vs(40), paddingHorizontal: vs(20), marginBottom: vs(70) }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(16) : s(16), fontWeight: '600'}}>{materials[selectedIndex]?.title}</Text>
            <View style={{width: '100%', backgroundColor: '#EFEEFC', height: vs(2), borderRadius: 20, marginVertical: vs(20)}}/>
            <Text style={{color: '#65628B', marginBottom: vs(20), fontSize: Platform.isPad? vs(14) : s(14)}}>№ Тема</Text>
            
            <View style={{ height: 'auto', width: '100%', gap: vs(12) }}>
                {materials[selectedIndex]?.topics.map((topic, index) => {
                    const isExpanded = expandedTopicId === topic?.id
                    return (
                        <Animated.View layout={LinearTransition.duration(200)} key={index} style={{ width: '100%', minHeight: Platform.isPad? vs(80) : s(80), height: 'auto', borderRadius: vs(20), borderWidth: 2, borderColor: '#EFEEFC', padding: vs(15), flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Platform.isPad? vs(15) : s(15)}}>
                                <Text style={{ fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>{topic?.id}</Text>
                                <Text style={{ fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>{topic?.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Platform.isPad? vs(15) : s(15)}}>
                                <View style={{gap: Platform.isPad? vs(8) : s(8), flexDirection: 'row'}}>
                                    {topic?.tags.slice(0, 2).map((tag, index) => {
                                        return (
                                            <View style={{ width: 'auto', height: 'auto', paddingHorizontal: vs(15), paddingVertical: vs(5), borderRadius: 7, backgroundColor: tag.backgroundColor }} key={index}>
                                                <Text style={{fontSize: vs(12)}}>{tag?.name}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <TouchableOpacity onPress={() => toggleTopic(topic.id)} style={{width: 'auto', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                                    <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={vs(22)}/>
                                </TouchableOpacity>
                            </View>
                            {isExpanded && (
                                <View style={{ flexDirection: 'row', height: 100, width: '100%' }}>
                                    
                                </View>
                            )}
                        </Animated.View>
                    )
                })}
            </View>
        </View>
    )
}

export default SubjectTable